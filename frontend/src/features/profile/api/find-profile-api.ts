import { api } from '@/config';

export const getProfile = async (username: string) => {
	const data = await api.get(`/query/profile/${username}`);

	return data;
};

export const uploadAvatar = async (file: File, username: string) => {
	const formData = new FormData();
	formData.append('avatar', file);
	await api.post(`/auth/avatar/${username}`, formData, {
		headers: {
			'content-type': 'multipart/form-data',
		},
	});
};
