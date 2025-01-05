import { api } from '@/config';
import { RegisterInput, LoginInput } from '../../../lib/schemas';
import { AuthResponse, User } from '@/types';

export const getUser = async (): Promise<User> => {
	const response = (await api.get('/auth/me')) as { data: User };
	return response.data;
};

export const registerUser = async (data: RegisterInput): Promise<AuthResponse> => {
	const response = await api.post('/auth/register', data);
	return response.data;
};

export const loginUser = async (data: LoginInput): Promise<AuthResponse> => {
	const response = await api.post('/auth/login', data);
	return response.data;
};

export const logoutUser = async (): Promise<void> => {
	await api.post('/auth/logout', {
		withCredentials: true,
	});
	sessionStorage.clear();
};
