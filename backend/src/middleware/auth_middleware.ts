import { Request, Response, NextFunction } from 'express';
import { body, validationResult, checkSchema } from 'express-validator';

export const isUserSignedIn = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			res.status(200).json({ user: null });
			return;
		}
		next();
	} catch (error) {
		res.status(200).json({ user: null });
		return;
	}
};
