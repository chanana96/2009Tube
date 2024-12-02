import { User } from '../models/user_model';
import { Video } from '../models/video_model';
import type { VideoModel } from '../models/video_model';
import { formatDuration } from '../utils/formatDuration';

export const userService = {
	uploadAvatar: async (username: string, fileKey: string) => {
		try {
			await User.update(
				{ profile_image: fileKey },
				{
					where: {
						username: username,
					},
				},
			);
		} catch (err) {
			throw err;
		}
	},
	uploadVideo: async ({
		user_uuid,
		video_uuid,
		video_title,
		video_length,
	}: Omit<VideoModel, 'createdAt'>) => {
		try {
			await Video.create({ user_uuid, video_uuid, video_title, video_length });
		} catch (err) {
			throw err;
		}
	},
};
