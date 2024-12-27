import { User } from '../models/user_model';
import { Video } from '../models/video_model';
import { VideoVote } from '../models/video_vote_model';
import type { VideoModel } from '../models/video_model';
import { getRedisClient } from '../config/redis_config';

type submitRatingPayload = {
	body: {
		user_id: string;
		rating: number;
	};
	params: {
		video_id: string;
	};
};

export const watchService = {
	submitRating: async ({ body, params }: submitRatingPayload) => {
		const { user_id, rating } = body;
		const { video_id } = params;
		try {
			const existingVote = await VideoVote.findOne({
				where: {
					user_id: user_id,
					video_uuid: video_id,
				},
			});

			if (existingVote) {
				const error = new Error('User has already voted on this video');
				error.name = 'DuplicateVoteError';
				throw error;
			}

			await Video.increment(
				{
					rating: rating > 0 ? 1 : -1,
					rating_pool: 1,
				},
				{
					where: {
						video_uuid: video_id,
					},
				},
			);

			await VideoVote.create({
				user_id: user_id,
				video_uuid: video_id,
				rating: rating,
			});
		} catch (err) {
			throw err;
		}
	},
};
