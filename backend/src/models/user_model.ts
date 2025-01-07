import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database_config';
import z from 'zod';

export interface UserModel {
	id: number;
	username: string;
	email: string;
	password_hash: string;
	bio?: string | null;
	profile_image?: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export const User = sequelize.define(
	'user',
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password_hash: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		bio: DataTypes.TEXT,
		profile_image: DataTypes.STRING,
	},
	{
		tableName: 'users',
	},
);

export const UserSchema = z.object({
	id: z.number(),
	username: z.string(),
	email: z.string().email(),
	password_hash: z.string(),
	bio: z.string().nullable().optional(),
	profile_image: z.string().nullable().optional(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type UserType = z.infer<typeof UserSchema>;
