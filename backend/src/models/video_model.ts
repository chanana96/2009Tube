import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database_config';

export interface VideoModel {
	'user_uuid': string;
	'video_uuid': string;
	'video_title': string;
	'createdAt': Date;
	'video_length': number;
	'user.username'?: string;
}

export const Video = sequelize.define(
	'video',
	{
		user_uuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		video_uuid: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		video_title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		video_length: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: 'videos',
	},
);
