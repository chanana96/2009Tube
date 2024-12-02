import type { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth_service';
import { tokenService } from '../services/token_service';
import { userService } from '../services/user_service';
import { segmentForHls } from '../config/ffmpeg_config';
import { s3 } from '../config/s3_config';
import { nanoid } from 'nanoid';
import fs from 'fs';
import { getRedisClient } from '../config/redis_config';
import type { RedisClientType } from 'redis';
import type { RedisCommand } from '@redis/client/dist/lib/commands';

require('dotenv').config();
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

export type Token = {
	data: string;
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, email, password } = req.body;
		await authService.registerUserService({ username, email, password });

		res.status(201).json({ message: 'User registered successfully' });
	} catch (err) {
		res.status(409).send('Failed to create user');
		next(err);
	}
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password } = req.body;
		const { token, refresh } = await authService.loginUserService({ username, password });

		res.cookie('token', refresh, {
			httpOnly: true,
			sameSite: 'strict',
		});
		res.status(200).json({ message: 'Successful login', accessToken: token });
	} catch (err) {
		res.status(401).send('Invalid login');
		next(err);
	}
};
export const logoutUser = async (req: Request, res: Response) => {
	try {
		res.clearCookie('token', {
			httpOnly: true,
		});
		res.status(200).json({ message: 'Logged out' });
	} catch (err) {
		res.status(500).json({ message: 'There was a problem logging out' });
	}
};

export const isUser = async (req: Request, res: Response) => {
	try {
		const token = req.cookies.token;
		const decoded = await tokenService.verifyJWT(token);
		const sessionToken = await tokenService.signJWT(decoded.data);

		res.status(200).json({ sessiontoken: sessionToken, userdata: decoded.data });
	} catch (err) {
		res.status(403).json({ message: 'Invalid token' });
	}
};

export const uploadAvatar = async (req: Request, res: Response) => {
	try {
		if (!req.file) {
			res.status(400).json({ message: 'No file uploaded' });
			return;
		}
		const { buffer, originalname, mimetype } = req.file;
		const fileKey = `${Date.now()}-${originalname}`;
		const username = req.params.username;

		s3.putObject({
			Bucket: BUCKET_NAME,
			Key: `'Avatars/'${fileKey}`,
			Body: buffer,
			ACL: 'public-read',
			ContentType: mimetype,
		});

		await userService.uploadAvatar(username, fileKey);
	} catch (err) {
		res.status(400).json({ message: 'Bad request' });
		console.log(err);
		return;
	}
};

export const progressReport = async (req: Request, res: Response) => {
	const redis = await getRedisClient();
	await redis.set(req.body.video_id, req.body.progress);

	return;
};

const cleanup = async (redis: RedisClientType, destination: string, video_uuid: string) => {
	await Promise.all([fs.promises.rmdir(destination, { recursive: true }), redis.del(video_uuid)]);
};
export const uploadVideo = async (req: Request, res: Response) => {
	const redis = await getRedisClient();
	let video_uuid: string | null = null;
	let destination: string | null = null;
	try {
		console.log('multer done');
		if (!req.file) {
			res.status(400).json({ message: 'No file uploaded' });
			return;
		}
		const { destination, filename } = req.file;
		const user_uuid = req.params.useruuid;
		const video_title = req.body.title;
		const video_uuid = req.body.video_id;

		const video_length = await segmentForHls(destination, filename, video_uuid);
		await userService.uploadVideo({ user_uuid, video_uuid, video_title, video_length });
		await cleanup(redis as RedisClientType, destination, video_uuid);
		res.status(200).json({ video_id: video_uuid, message: 'DONE' });
		console.log('done');
	} catch (err) {
		if (destination && video_uuid) {
			await cleanup(redis as RedisClientType, destination, video_uuid);
		}
		res.status(400).json({ message: 'Bad request' });
		console.log(err);
		return;
	}
};

export const uploadVideoGetId = async (req: Request, res: Response) => {
	try {
		const video_uuid = nanoid(10);
		const redis = await getRedisClient();
		await redis.set(video_uuid, 0);
		res.status(200).json({ video_id: video_uuid });
	} catch (err) {
		res.status(400).json({ message: 'Bad request' });
		console.log(err);
		return;
	}
};
