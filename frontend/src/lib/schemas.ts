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
		Username: zodUsername,
		Email: zodEmail,
		Password: zodPassword,
		ConfirmPassword: zodPassword,
		AllowEmails: z.boolean().default(false),
	})
	.refine((input) => input.Password == input.ConfirmPassword, {
		message: 'Passwords do not match.',
		path: ['ConfirmPassword'],
	});

export const loginInputSchema = z.object({
	Email: zodEmail,
	Password: zodPassword,
});

export const newUsernameOrPasswordInputSchema = z
	.object({
		NewUsername: zodUsername,
		OldPassword: zodPassword,
		NewPassword: zodPassword,
		ConfirmNewPassword: zodPassword,
	})
	.refine((input) => input.NewPassword == input.ConfirmNewPassword, {
		message: 'Passwords do not match.',
		path: ['ConfirmPassword'],
	});

export type RegisterInput = z.infer<typeof registerInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
export type NewUsernameOrPasswordInput = z.infer<typeof newUsernameOrPasswordInputSchema>;
