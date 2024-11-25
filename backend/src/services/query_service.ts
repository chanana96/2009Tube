import { User } from '../models/user_model';

export const queryService = {
	findProfile: async (username:string)=>{
		try{
		const user: any = await User.findOne({ where: { username: username } });

		if (!user){ 
			throw new Error("User does not exist");
		}
	
		return user
	
	} 
	catch(err){
		throw err
	}
}
}