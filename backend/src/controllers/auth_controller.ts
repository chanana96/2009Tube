import type { Request, Response, NextFunction } from 'express';
import {authService} from '../services/auth_service'
import { tokenService } from '../services/token_service';
import { userService } from '../services/user_service';
import { generateThumbnailBuffer} from '../config/ffmpeg_config'
import {s3} from '../config/s3_config'
import { nanoid } from 'nanoid'; 

require('dotenv').config()


const BUCKET_NAME = process.env.AWS_BUCKET_NAME

export const registerUser = async (req: Request, res: Response, next:NextFunction) => {
	try{
		const {username, email, password} = req.body
		await authService.registerUserService({username, email, password})
		
		res.status(201).json({ message: 'User registered successfully' });
	}
	catch(err){
		res.status(409).send('Failed to create user')
		next(err)
		
	}
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	try{
		const {username, password} = req.body
		const {token, refresh} = await authService.loginUserService({username, password})
		
		res.cookie("token", refresh,{

			httpOnly:true,
			sameSite: 'strict'
		})
		res.status(200).json({ message: 'Successful login', accessToken: token });
		return token
	}
	catch(err){
		res.status(401).send('Invalid login')
		next(err)

	}
}
export const logoutUser = async (req:Request, res:Response) =>{
	try{
		res.clearCookie('token', {
			httpOnly: true
		  });
		res.status(200).json({message: 'Logged out'})
		
	}
	catch(err){
		res.status(500).json({ message: 'There was a problem logging out'});
	}
}

export const isUser = async (req:Request, res:Response) =>{
	
	try{
		const token = req.cookies.token
		const decoded = await tokenService.verifyJWT(token)
		const sessionToken = await tokenService.signJWT(decoded.data)
		
		res.status(200).json({sessiontoken:sessionToken, userdata: decoded.data});
		return sessionToken
	}
	catch(err){
		res.status(403).json({ message: 'Invalid token' });
	}
	
}

export const uploadAvatar = async (req, res) =>{
	try{
		const {buffer, originalname, mimetype} = req.file
		const fileKey = `${Date.now()}-${originalname}`;
		const username = req.params.username

		s3.putObject({
			Bucket: BUCKET_NAME,
			Key: `'Avatars/'${fileKey}`,
			Body: buffer,
			ACL: 'public-read',
			ContentType: mimetype
		})

		await userService.uploadAvatar(username, fileKey)		
	}
	catch(err){
		res.status(400).json({ message: 'Bad request' });
		console.log(err)
		return
	}
}

export const uploadVideo = async (req, res) =>{
	try{
		const {buffer, mimetype} = req.file;
		const video_uuid = nanoid(10)
		const video_thumbnail = `${video_uuid}.jpg`;
		const user_uuid = req.params.useruuid
		const video_title = req.body.title;  
		const thumbnail_buffer = await generateThumbnailBuffer(buffer);

		await Promise.all([
		 s3.putObject({
				Bucket: BUCKET_NAME,
				Key: `Videos/${video_uuid}`,
				Body: buffer,
				ACL: 'public-read',
				ContentType: mimetype
			})
			,
			 s3.putObject({
				Bucket: BUCKET_NAME,
				Key: `Thumbnails/${video_thumbnail}`,
				Body: thumbnail_buffer,
				ACL: 'public-read',
				ContentType: 'image/jpeg'
			})
		])

		await userService.uploadVideo({user_uuid, video_uuid, video_title, video_thumbnail})	
		res.status(200).json({ video: video_uuid, thumbnail: video_thumbnail });	
	}
	catch(err){
		res.status(400).json({ message: 'Bad request' });
		console.log(err)
		return
	}
}