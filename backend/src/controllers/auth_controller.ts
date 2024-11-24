import type { Request, Response, NextFunction } from 'express';
import {authService} from '../services/auth_service'
import { tokenService } from '../services/token_service';
import cookieParser from 'cookie-parser'
import { token } from 'morgan';

export const registerUser = async (req: Request, res: Response, next:NextFunction) => {
	try{
		const {username, email, password} = req.body
		await authService.registerUserService({username, email, password})
		
		res.status(200).json({ message: 'User registered successfully' });
	}
	catch(err){
		next(err)
		
	}
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	try{
		const {username, password} = req.body
		let token = await authService.loginUserService({username, password})
		
		res.cookie("token", token,{

			httpOnly:true,
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000
		})
		res.status(200).json({ message: 'Successful login' });
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
		res.status(200).json({
			success: true,
			user: decoded.data})
		return decoded
	}
	catch(err){
		res.status(403).json({ message: 'Invalid token' });
	}
}

