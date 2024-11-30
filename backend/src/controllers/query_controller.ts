import { queryService } from '../services/query_service';
import type { Request, Response } from 'express';

require('dotenv').config();

const URL = process.env.AWS_URL;

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
		const { video_title, createdAt, user_uuid } = await queryService.findVideo(video_id);

		res.status(200).json({
			video_title,
			createdAt,
			url: URL + `Videos/${video_id}/playlist.m3u8`,
			user_uuid: user_uuid,
		});
	} catch (err) {
		res.status(404).send('Video not found');
		return;
	}
};
