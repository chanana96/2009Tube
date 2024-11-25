import type { Request, Response, NextFunction } from 'express';
import {authService} from '../services/auth_service'
import { tokenService } from '../services/token_service';
import cookieParser from 'cookie-parser'
import { token } from 'morgan';

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

