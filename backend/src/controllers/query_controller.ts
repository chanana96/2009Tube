import { queryService } from '../services/query_service';
import type { Request, Response } from 'express';
import { getRedisClient } from '../config/redis_config';

require('dotenv').config();

const URL = process.env.CLOUDFRONT_URL!;

export const queryProfile = async (req: Request, res: Response) => {
	try {
		const username = req.params.username;
		const { bio, createdAt, profile_image, id } = await queryService.findProfile(username);
		res.status(200).json({
			bio,
			createdAt,
			profile_image: URL + profile_image,
			user_uuid: id,
		});
	} catch (err) {
		res.status(404).send('User not found');
		return;
	}
};

export const queryVideo = async (req: Request, res: Response) => {
	try {
		const video_id = req.params.video_id;
		const redis = await getRedisClient();
		const cachedVideo = await redis.get(video_id);
		if (cachedVideo) {
			res.status(200).json({
				message: 'UPLOADING',
			});
			return;
		}
		const {
			video_title,
			createdAt,
			'user.username': username,
			rating,
			rating_pool,
		} = await queryService.findVideo(video_id);
		const rating_percentage = rating_pool ? Math.round((rating! / rating_pool!) * 100) : 0;
		res.status(200).json({
			message: 'OK',
			video_title,
			createdAt,
			url: URL + `Videos/${video_id}/playlist.m3u8`,
			username: username,
			rating_percentage,
		});
	} catch (err) {
		res.status(404).send('Video not found');
		return;
	}
};

export const queryVideoFeed = async (req: Request, res: Response) => {
	try {
		const videos = await queryService.findVideoFeed();

		res.status(200).json({ videos });
	} catch (err) {
		console.log(err);
		res.status(500).send('Error fetching videos');
		return;
	}
};
