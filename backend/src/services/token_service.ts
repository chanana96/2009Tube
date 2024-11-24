import jwt from 'jsonwebtoken'


require('dotenv').config()
const JWT_ACCESS_SECRET= process.env.JWT_ACCESS_SECRET


export const tokenService = {
	
	signJWT: async (userId: string) => {
		
 const token = jwt.sign({
	data: userId
  }, JWT_ACCESS_SECRET, { expiresIn: '1h' });
  return token
  
}
,
verifyJWT: async (token) =>{
	let decoded = jwt.verify(token, JWT_ACCESS_SECRET);

	return decoded
} 
}