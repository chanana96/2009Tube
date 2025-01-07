import {
	useMutation,
	useQueryClient,
	type UseQueryOptions,
	useQuery,
	queryOptions,
} from '@tanstack/react-query';
import { authConfig } from '@/config';
import type { User } from '@/types';

const { userFn, loginFn, registerFn, logoutFn, userKey = ['user'] } = authConfig;

export type UseAuthProps = {
	onSuccess: () => void;
	onError?: (errorMessage: string) => void;
};

export const getUserQueryOptions = () => {
	return queryOptions({
		queryKey: userKey,
		queryFn: userFn,
		staleTime: 1000 * 60 * 10,
		retry: 1,
	});
};

export const useUser = (options?: UseQueryOptions<User>) =>
	useQuery<User>({
		...getUserQueryOptions(),
		...options,
	});

export const useLogin = ({ onSuccess }: UseAuthProps) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: loginFn,
		onSuccess: (data) => {
			queryClient.setQueryData(userKey, data);
			queryClient.invalidateQueries({ queryKey: userKey });
			onSuccess?.();
		},
	});
};

export const useRegister = ({ onSuccess, onError }: UseAuthProps) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: registerFn,
		onSuccess: (data) => {
			queryClient.setQueryData(userKey, data);
			queryClient.invalidateQueries({ queryKey: userKey });
			onSuccess?.();
		},
		onError: (error) => {
			onError!(error.message);
		},
	});
};

export const useLogout = ({ onSuccess }: UseAuthProps) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: logoutFn,
		onSuccess: () => {
			queryClient.setQueryData(userKey, null);
			queryClient.clear();
			onSuccess?.();
		},
	});
};
