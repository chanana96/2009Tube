import { User } from '../models/user_model';
import { Video } from '../models/video_model';
import { VideoComment } from '../models/video_comment_model';
import type { UserModel } from '../models/user_model';
import type { VideoModel } from '../models/video_model';
import { Op, Sequelize } from 'sequelize';

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
		} catch (e) {
			throw e;
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
		} catch (e) {
			throw e;
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
			console.log(videos);
			return videos;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	findSearch: async (searchParams: string) => {
		try {
			console.log(searchParams);
			User.hasMany(Video, { foreignKey: 'user_uuid', sourceKey: 'id' });
			Video.belongsTo(User, {
				foreignKey: 'user_uuid',
				targetKey: 'id',
			});
			const searchTerms = searchParams
				.trim()
				.split(/\s+/)
				.filter((term) => term.length > 0)
				.map((term) => term.replace(/[%_]/g, '\\$&'));

			const videos = await Video.findAll({
				where: {
					[Op.or]: searchTerms.map((term) => ({
						[Op.and]: [
							Sequelize.where(
								Sequelize.fn('LOWER', Sequelize.col('video_title')),
								'LIKE',
								`%${term.toLowerCase()}%`,
							),
						],
					})),
				},
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
			console.log(videos);
			return videos;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	findComments: async (video_id: string) => {
		try {
			VideoComment.belongsTo(User, {
				foreignKey: 'user_id',
				targetKey: 'id',
			});

			const comments = await VideoComment.findAll({
				where: {
					video_uuid: video_id,
				},
				include: [
					{
						model: User,
						attributes: ['username', 'profile_image'],
					},
				],
				order: [['createdAt', 'DESC']],
				raw: true,
			});

			return comments;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
};
