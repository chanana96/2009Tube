export type AuthResponse = {
	token: string;
	user: User;
};

export type Base = {
	id: string;
	createdAt: number;
};

export type User = {
	username: string;
	avatar: string;
} & Base;
