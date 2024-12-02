export const useAuthSession = () => {
	const userSession = sessionStorage.getItem('user');
	const avatar = sessionStorage.getItem('avatar');
	const user_uuid = sessionStorage.getItem('user_uuid');
	return {
		userSession,
		avatar,
		user_uuid,
	};
};
