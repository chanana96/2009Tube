import { DataTypes } from 'sequelize';

import { sequelize } from '../config/database_config';

export const Video = sequelize.define(
	'video',
	{
		user_uuid: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		video_uuid: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		video_title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'videos',
	},
);
