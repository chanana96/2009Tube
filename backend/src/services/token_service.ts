import jwt from 'jsonwebtoken';
import { z } from 'zod';

require('dotenv').config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

const TokenSchema = z.object({
	data: z.string(),
});

export const tokenService = {
	signJWT: async (userId: string) => {
		const token = jwt.sign(
			{
				data: userId,
			},
			JWT_ACCESS_SECRET,
			{ expiresIn: '15m' },
		);
		return token;
	},
	signRefresh: async (userId: string) => {
		const refresh = jwt.sign(
			{
				data: userId,
			},
			JWT_REFRESH_SECRET,
		);

		return refresh;
	},

	verifyJWT: async (token: string) => {
		try {
			let decoded = jwt.verify(token, JWT_REFRESH_SECRET);
			const parsedToken = TokenSchema.parse(decoded);
			return parsedToken;
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
};
