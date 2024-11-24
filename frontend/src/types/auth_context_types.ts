export interface AuthContext {
	user: string | null;
	isAuth: boolean;
	logout: () => void;
	isLoading: boolean;
}
