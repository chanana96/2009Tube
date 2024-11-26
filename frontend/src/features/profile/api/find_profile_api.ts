import axios from 'axios';
import { AxiosError } from 'axios';

export const getProfile = async (username: string) => {
	const data = await axios.get(`/api/query/profile/${username}`);

	return data;
};

export const uploadAvatar = async (file: File, username: string) => {
	const formData = new FormData();
	formData.append('avatar', file);
	await axios.post(`/api/auth/avatar/${username}`, formData, {
		headers: {
			'content-type': 'multipart/form-data',
		},
	});
};
