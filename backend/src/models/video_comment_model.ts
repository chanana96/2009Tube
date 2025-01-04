import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database_config';

export const VideoComment = sequelize.define('video_comment', {
	user_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	video_uuid: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	comment: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});
