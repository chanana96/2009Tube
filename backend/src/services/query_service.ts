import { User } from '../models/user_model';
import { Video } from '../models/video_model';
import type { UserModel } from '../models/user_model';
import type { VideoModel } from '../models/video_model';

export const queryService = {
	findProfile: async (username: string) => {
		try {
			const user = (await User.findOne({
				where: { username: username },
			})) as UserModel | null;

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
			User.hasMany(Video, { foreignKey: 'user_uuid', sourceKey: 'id' });
			Video.belongsTo(User, {
				foreignKey: 'user_uuid',
				targetKey: 'id',
			});

			const video = (await Video.findOne({
				where: { video_uuid: video_id },
				include: [
					{
						model: User,
						attributes: ['username'],
					},
				],
				raw: true,
			})) as VideoModel | null;

			if (!video) {
				throw new Error('Video does not exist');
			}
			return video;
		} catch (err) {
			throw err;
		}
	},
	findVideoFeed: async () => {
		try {
			User.hasMany(Video, { foreignKey: 'user_uuid', sourceKey: 'id' });
			Video.belongsTo(User, {
				foreignKey: 'user_uuid',
				targetKey: 'id',
			});

			const videos = await Video.findAll({
				limit: 10,
				order: [['createdAt', 'DESC']],
				include: [
					{
						model: User,
						attributes: ['username'],
					},
				],
				raw: true,
			});
			if (!videos) {
				throw new Error('Videos not found');
			}
			return videos;
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
};
