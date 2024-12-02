import { User } from '../models/user_model';
import { Video } from '../models/video_model';
import type { VideoModel } from '../models/video_model';
import { getRedisClient } from '../config/redis_config';
type submitRatingPayload = {
	user_id: string;
	video_id: string;
	rating: number;
	previousUserRating?: number;
};

const calculateRating = async (currentRating: number, newRating: number, ratingPool: number) => {};

export const watchService = {
	submitRating: async ({
		user_id,
		video_id,
		rating,
		previousUserRating,
	}: submitRatingPayload) => {
		const redisClient = await getRedisClient();
		try {
			if (previousUserRating) {
				return;
			}

			await Video.update(
				{ rating: rating },
				{
					where: {
						video_uuid: video_id,
					},
				},
			);
		} catch (err) {
			throw err;
		}
	},
};
