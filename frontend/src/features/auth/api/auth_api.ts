import axios from 'axios';
import type { Inputs, RegisterValidationError } from '../types';
import { AxiosError } from 'axios';

export const registerUserApi = async ({ email, username, password }: Inputs) => {
	try {
		const response = await axios.post('/api/auth/register', {
			username,
			email,
			password,
		});
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

export const loginUserApi = async ({ username, password }: Omit<Inputs, 'email'>) => {
	try {
		const response = await axios.post('/api/auth/login', {
			username,
			password,
		});
		console.log(response);
		return response.data;
	} catch (err) {
		if (err instanceof AxiosError) {
			return err.response!.data;
		}
	}
};

export const logout = async () => {
	try {
		await axios.post('/api/auth/logout', {
			withCredentials: true,
		});
		sessionStorage.clear();
	} catch (err) {
		return err;
	}
};
