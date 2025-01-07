import { UserModel } from '../models/user_model';

export const sanitizeUser = (user: UserModel) => {
	const { password_hash, ...rest } = user;
	return rest;
};

export type SanitizedUserType = ReturnType<typeof sanitizeUser>;
