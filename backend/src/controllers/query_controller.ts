import { queryService } from "../services/query_service";
import type { Request,Response } from "express";

export const queryProfile = async (req:Request, res:Response) =>{
	try{
		const username = req.params.username
		const {bio, createdAt, profile_image} = await queryService.findProfile(username)
		res.status(200).json({bio, createdAt, profile_image});
		
	}	
	catch(err){
		res.status(404).send('User not found')
		return
	}
}