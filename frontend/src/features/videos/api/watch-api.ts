import { AxiosError } from 'axios';
import { api } from '@/config';

export const rateVideo = async (video_id: string, rating: number, user_id: string | null) => {
	try {
		const response = await api.post(`/auth/submit/rating/${video_id}`, {
			rating,
			user_id,
		});
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			return error.response?.data;
		}
		return error;
	}
};
