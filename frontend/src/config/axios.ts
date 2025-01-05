import axios, { InternalAxiosRequestConfig } from 'axios';
import { env } from './env';
import { useNotifications } from '@/components/ui/notificationsStore';
import { paths } from './paths';

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
	if (config.headers) {
		config.headers.Accept = 'application/json';
	}

	config.withCredentials = true;
	return config;
};

export const api = axios.create({
	baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		const message = error.response?.data?.message || error.message;
		useNotifications.getState().addNotification({
			type: 'error',
			title: 'Error',
			message,
		});

		if (error.response?.status === 401) {
			const searchParams = new URLSearchParams();
			const redirectTo = searchParams.get('redirectTo') || window.location.pathname;
			window.location.href = paths.auth.login.getHref(redirectTo);
		}

		return Promise.reject(error);
	},
);
