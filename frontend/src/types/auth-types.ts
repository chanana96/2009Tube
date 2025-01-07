export type AuthResponse = {
	token: string;
	user: User;
};

export type Base = {
	id: number;
	createdAt: string;
};

export type User = {
	bio: null;
	email: string;
	profile_image: string;
	username: string;
} & Base;
