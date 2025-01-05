import axios, { InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
	if (config.headers) {
		config.headers.Accept = 'application/json';
	}

	config.withCredentials = true;
	return config;
}

export const api = axios.create({
	baseURL: '/api',
});

api.interceptors.request.use(authRequestInterceptor);
