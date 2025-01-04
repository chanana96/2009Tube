import type { Request, Response, NextFunction } from 'express';
import { watchService } from '../services/watch_service';

export const submitRatingForVideo = async (req: Request, res: Response) => {
	try {
		await watchService.submitRating({
			body: req.body,
			params: req.params as { video_id: string },
		});
		res.status(200).json({ message: 'Rating submitted successfully' });
	} catch (err: unknown) {
		if (err instanceof Error) {
			if (err.name === 'DuplicateVoteError') {
				res.status(409).json({
					message: err.message,
					error: 'DUPLICATE_VOTE',
				});
				return;
			}

			res.status(400).json({
				message: err.message,
				error: 'BAD_REQUEST',
			});
			return;
		}

		console.error('Unknown error:', err);
		res.status(500).json({
			message: 'An unexpected error occurred',
			error: 'INTERNAL_SERVER_ERROR',
		});
	}
};

export const submitCommentForVideo = async (req: Request, res: Response) => {
	try {
		const newComment = await watchService.submitComment({
			body: req.body,
			params: req.params as { video_id: string },
		});
		res.status(200).json({ message: 'Comment submitted successfully', comment: newComment });
	} catch (err: unknown) {
		if (err instanceof Error) {
			res.status(400).json({
				message: err.message,
				error: 'BAD_REQUEST',
			});
			return;
		}
		console.error('Unknown error:', err);
		res.status(500).json({
			message: 'An unexpected error occurred',
			error: 'INTERNAL_SERVER_ERROR',
		});
	}
};
