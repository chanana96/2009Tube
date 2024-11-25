import jwt from 'jsonwebtoken'


require('dotenv').config()
const JWT_ACCESS_SECRET= process.env.JWT_ACCESS_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

export const tokenService = {
	
	signJWT: async (userId: string) => {
		
 const token = jwt.sign({
	data: userId
  }, JWT_ACCESS_SECRET, { expiresIn: '15m' });
  return token
  
}
,
signRefresh: async (userId: string) =>{
	const refresh = jwt.sign({
		data: userId
	},JWT_REFRESH_SECRET)

	return refresh
},

verifyJWT: async (token) =>{
	let decoded = await jwt.verify(token, JWT_REFRESH_SECRET);

	return decoded
} 
}