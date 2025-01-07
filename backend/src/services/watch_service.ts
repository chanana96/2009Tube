import { Video } from '../models/video_model';
import { VideoVote } from '../models/video_vote_model';
import { VideoComment } from '../models/video_comment_model';

type submitPayload = {
	body: {
		user_id: string;
	};
	params: {
		video_id: string;
	};
};

export const watchService = {
	submitRating: async ({ body, params }: submitPayload & { body: { rating: number } }) => {
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
	submitComment: async ({ body, params }: submitPayload & { body: { comment: string } }) => {
		const { user_id, comment } = body;
		const { video_id } = params;
		try {
			const newComment = await VideoComment.create({
				user_id: user_id,
				video_uuid: video_id,
				comment: comment,
			});

			return newComment;
		} catch (err) {
			throw err;
		}
	},
};
