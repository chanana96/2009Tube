import axios from 'axios';
import { AxiosError } from 'axios';

export const getProfile = async (username: string) => {
	const data = await axios.get(`/api/query/profile/${username}`);

	return data;
};
