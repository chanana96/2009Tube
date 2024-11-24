import {DataTypes} from 'sequelize'

import {sequelize} from '../config/database_config'

export const User = sequelize.define('user', {

	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	  },
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	  },
	password_hash: {
		type: DataTypes.STRING,
		allowNull: false
	  },
	bio: DataTypes.TEXT,
	profile_image: DataTypes.STRING,
},
{
    tableName: 'users',
  })