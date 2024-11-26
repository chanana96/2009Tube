import { User } from '../models/user_model';

export const userService = {
	uploadAvatar: async (username:string, etag: string)=>{
		try{
			if (!username || !etag){
				return
			}
		await User.update(
			{ profile_image: etag },
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
}
}