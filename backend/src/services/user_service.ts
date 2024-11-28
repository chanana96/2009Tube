import { User } from '../models/user_model';
import {Video} from '../models/video_model'



export const userService = {
	uploadAvatar: async (username:string, fileKey: string)=>{
		try{
			
		await User.update(
			{ profile_image: fileKey },
			{
			  where: {
				username: username,
			  },
			},
		  );

	} 
	catch(err){
		throw err
	}
},
	uploadVideo: async ({user_uuid, video_uuid, video_title, video_thumbnail})=>{
		try{		
			await Video.create({user_uuid, video_uuid, video_title, video_thumbnail})	
	} 
	catch(err){
		throw err
	}
}
}