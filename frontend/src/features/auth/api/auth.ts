import { AxiosError } from 'axios';
import { api } from '@/config/axios';
import { AuthResponse, User, RegisterInput, LoginInput } from '../types';

export const getUser = async (): Promise<User> => {
	const response = (await api.get('/auth/me')) as { data: User };
	return response.data;
};

export const registerUser = async (data: RegisterInput) => {
	try {
		const response = await api.post('/auth/register', data);
		return response.data;
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			const { name, fields } = err.response!.data;
			return {
				type: name,
				field: Object.keys(fields).join(', '),
			};
		}
	}
};

export const loginUser = async (data: LoginInput) => {
	try {
		const response = await api.post('/auth/login', data);
		return response.data;
	} catch (err) {
		if (err instanceof AxiosError) {
			return err.response!.data;
		}
	}
};

export const logout = async () => {
	try {
		await api.post('/auth/logout', {
			withCredentials: true,
		});
		sessionStorage.clear();
	} catch (err) {
		return err;
	}
};
