import { api } from '@/config';

export const getProfile = async (username: string) => {
	const data = await api.get(`/query/profile/${username}`);

	return data;
};
