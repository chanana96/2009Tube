import { body, validationResult, checkSchema  } from 'express-validator';

const checkEmailNotInUse = async () => {
	try{
		
	}
	catch(err)
	{
		throw new Error('Error in checkEmailNotInUse: ' + err.message);
	}
}

const checkUsernameNotInUse = async () => {}

export const authValidation={
	
	userRegisterValidation: checkSchema({
		email: {emailNotInUse: {
			custom: checkEmailNotInUse,
			bail: true,
		  } },
		username:{usernameNotInUse: {
			custom: checkUsernameNotInUse,
			bail: true,
		  } },
		password: { isLength: { options: { min: 8 } } },
	  })
	
}

