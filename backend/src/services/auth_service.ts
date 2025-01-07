import bcrypt from 'bcrypt';
import { User } from '../models/user_model';
import { tokenService } from './token_service';
import type { UserModel } from '../models/user_model';
import { sanitizeUser } from '@/utils/sanitizeUser';

type UserAuth = {
	username: string;
	email: string;
	password: string;
};

const findUser = async (email: string, password: string) => {
	const user = (await User.findOne({
		where: { email: email },
	})) as UserModel | null;

	if (!user) {
		throw new Error('Invalid login');
	}
	const verified = await verifyUserPassword({ password, password_hash: user.password_hash });
	if (verified) {
		return sanitizeUser(user);
	}
	return false;
};

export const verifyUserPassword = async ({
	password,
	password_hash,
}: {
	password: string;
	password_hash: string;
}) => {
	try {
		return await bcrypt.compare(password, password_hash);
	} catch (err) {
		throw err;
	}
};
export const authService = {
	registerUserService: async ({ username, email, password }: UserAuth) => {
		const saltRounds = 10;
		try {
			const hash = await bcrypt.hash(password, saltRounds);
			const registerUser = await User.create({ username, email, password_hash: hash });
			return registerUser;
		} catch (err) {
			throw err;
		}
	},

	loginUserService: async ({ email, password }: Omit<UserAuth, 'username'>) => {
		try {
			const user = await findUser(email, password);
			if (!user) {
				throw new Error('Invalid login');
			}

			const refresh = await tokenService.signRefresh(user);
			const token = await tokenService.signJWT(user);
			return {
				refresh,
				token,
				username: user.username,
				avatar: user.profile_image,
				id: user.id,
				createdAt: user.createdAt,
			};
		} catch (err) {
			throw err;
		}
	},
};
