import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database_config';

export const VideoVote = sequelize.define('video_vote', {
	user_id: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	video_uuid: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});
