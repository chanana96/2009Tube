import { useQuery } from '@tanstack/react-query';

interface QueryData {
	data: {
		sessiontoken: string;
		userdata: string;
	};
	status: number;
	statusText: string;
}

export const useAuth = () => {
	const { data, isLoading } = useQuery<QueryData>({
		queryKey: ['authState'],
	});

	return {
		isAuthenticated: data?.status === 200,
		isLoading,
		user: data?.data?.userdata,
		token: data?.data?.sessiontoken,
	};
};
