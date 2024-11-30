import { User } from '../models/user_model';
import { Video } from '../models/video_model';

export const queryService = {
	findProfile: async (username: string) => {
		try {
			const user: any = await User.findOne({ where: { username: username } });

			if (!user) {
				throw new Error('User does not exist');
			}

			return user;
		} catch (err) {
			throw err;
		}
	},
	findVideo: async (video_id: string) => {
		try {
			const video: any = await Video.findOne({ where: { video_uuid: video_id } });

			if (!video) {
				throw new Error('Video does not exist');
			}

			return video;
		} catch (err) {
			throw err;
		}
	},
};
