import {
	useMutation,
	useQueryClient,
	type UseQueryOptions,
	useQuery,
	queryOptions,
} from '@tanstack/react-query';
import { authConfig } from '@/config';

const { userFn, loginFn, registerFn, logoutFn, userKey = ['user'] } = authConfig;

export type UseAuthProps = {
	onSuccess: () => void;
	onError?: (errorMessage: string) => void;
};

export const getUserQueryOptions = () => {
	return queryOptions({
		queryKey: userKey,
		queryFn: userFn,
	});
};

export const useUser = (options?: UseQueryOptions) =>
	useQuery({
		queryKey: userKey,
		queryFn: userFn,
		...options,
	});

export const useLogin = ({ onSuccess }: UseAuthProps) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: loginFn,
		onSuccess: (data) => {
			queryClient.setQueryData(userKey, data);
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
			onSuccess?.();
		},
	});
};
