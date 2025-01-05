import { getUser, registerUser, loginUser, logoutUser } from '@/features/auth/api/auth-api';
import { type MutationFunction, type QueryFunction, type QueryKey } from '@tanstack/react-query';
import { User } from '@/types';
import { LoginInput, RegisterInput } from '@/lib/schemas';

export type AuthConfig = {
	userFn: QueryFunction<User>;
	loginFn: MutationFunction<User, LoginInput>;
	registerFn: MutationFunction<User, RegisterInput>;
	logoutFn: MutationFunction<unknown, unknown>;
	userKey?: QueryKey;
};

export const authConfig: AuthConfig = {
	userFn: getUser,
	loginFn: async (data: LoginInput) => {
		const response = await loginUser(data);
		return response.user;
	},
	registerFn: async (data: RegisterInput) => {
		const response = await registerUser(data);
		return response.user;
	},
	logoutFn: logoutUser,
};
