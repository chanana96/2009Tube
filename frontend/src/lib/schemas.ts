import { z } from 'zod';

export const zodPassword = z
	.string()
	.min(6, 'Password must be at least 6 characters.')
	.max(20, 'Password cannot be longer than 20 characters.')
	.default('');
export const zodEmail = z.string().min(1, 'Email is required.').email('Invalid email.').default('');
export const zodUsername = z
	.string()
	.min(3, 'Username must be at least 3 characters.')
	.max(20, 'Username cannot be longer than 20 characters.')
	.default('');

export const registerInputSchema = z
	.object({
		username: zodUsername,
		email: zodEmail,
		password: zodPassword,
		confirmPassword: zodPassword,
		allowEmails: z.boolean().default(false),
	})
	.refine((input) => input.password == input.confirmPassword, {
		message: 'Passwords do not match.',
		path: ['ConfirmPassword'],
	});

export const loginInputSchema = z.object({
	email: zodEmail,
	password: zodPassword,
});

export const newUsernameOrPasswordInputSchema = z
	.object({
		newUsername: zodUsername,
		oldPassword: zodPassword,
		newPassword: zodPassword,
		confirmNewPassword: zodPassword,
	})
	.refine((input) => input.newPassword == input.confirmNewPassword, {
		message: 'Passwords do not match.',
		path: ['ConfirmPassword'],
	});

export const postCommentInputSchema = z.object({
	body: z.string().min(1, 'Required'),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
export type NewUsernameOrPasswordInput = z.infer<typeof newUsernameOrPasswordInputSchema>;
export type PostCommentInput = z.infer<typeof postCommentInputSchema>;
