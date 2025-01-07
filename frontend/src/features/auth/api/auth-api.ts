import { api } from '@/config';
import { RegisterInput, LoginInput } from '../../../lib/schemas';
import { AuthResponse, User } from '@/types';

export const getUser = (): Promise<User> => {
	return api.get('/auth/me');
};

export const registerUser = (data: RegisterInput): Promise<AuthResponse> => {
	return api.post('/auth/register', data);
};

export const loginUser = (data: LoginInput): Promise<AuthResponse> => {
	return api.post('/auth/login', data);
};

export const logoutUser = (): Promise<void> => {
	return api.post('/auth/logout');
};
