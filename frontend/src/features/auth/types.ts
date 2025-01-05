import { z } from 'zod';

export const registerInputSchema = z
	.object({
		Username: z.string().min(3, 'Username must be at least 3 characters').default(''),
		Email: z.string().min(1, 'Email is required.').default(''),
		Password: z.string().min(8, 'Password must be at least 8 letters.').default(''),
		ConfirmPassword: z.string().default(''),
		AllowEmails: z.boolean().default(false),
	})
	.refine((input) => input.Password == input.ConfirmPassword, {
		message: 'Passwords do not match.',
		path: ['ConfirmPassword'],
	});

export const loginInputSchema = z.object({
	Email: z.string().min(1, 'Required').email('Invalid email'),
	Password: z.string().min(5, 'Required'),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;

export type User = {};

export type AuthResponse = {
	Token: string;
	User: User;
};
