import type { Request, Response, NextFunction } from 'express';
import { watchService } from '../services/watch_service';

export const submitRatingForVideo = async (req: Request, res: Response) => {
	try {
		watchService.submitRating(req.body);
	} catch (err) {
		res.status(400).json({ message: 'Bad request' });
		console.log(err);
		return;
	}
};
