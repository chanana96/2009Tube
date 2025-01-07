import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { SanitizedUserType } from '@/utils/sanitizeUser';
require('dotenv').config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

const TokenSchema = z.object({
	id: z.number(),
	username: z.string(),
	email: z.string().email(),
	bio: z.string().nullable().optional(),
	profile_image: z.string().nullable().optional(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

interface JWTPayload {
	dataValues: TokenSchemaType;
	[key: string]: any;
}

export type TokenSchemaType = z.infer<typeof TokenSchema>;

export const tokenService = {
	signJWT: async (user: TokenSchemaType) => {
		const token = jwt.sign(user, JWT_ACCESS_SECRET, { expiresIn: '15m' });
		return token;
	},
	signRefresh: async (user: TokenSchemaType) => {
		const refresh = jwt.sign(user, JWT_REFRESH_SECRET);

		return refresh;
	},

	verifyJWT: async (token: string) => {
		try {
			let decoded = jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
			const parsedToken = TokenSchema.parse(decoded.dataValues);
			return parsedToken;
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
};
