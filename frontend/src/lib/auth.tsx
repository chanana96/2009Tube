import { Outlet, Navigate } from 'react-router-dom';
import { paths } from '@/config/paths';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '@/hooks/useAuth';
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUser, registerUser, loginUser } from '@/features/auth/api/auth';

export const ProtectedRoutes = () => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) return <CircularProgress />;
	return isAuthenticated ? <Outlet /> : <Navigate to={paths.auth.login.path} />;
};

const userQueryKey = ['user'];

export const getUserQueryOptions = () => {
	return queryOptions({
		queryKey: userQueryKey,
		queryFn: getUser,
	});
};

export const useRegister = ({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (errorMessage: string) => void;
}) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: registerUser,
		onSuccess: (data) => {
			queryClient.setQueryData(userQueryKey, data.User);
			console.log(queryClient);
			onSuccess?.();
		},
		onError: (error) => {
			onError!(error.message);
		},
	});
};

export const useLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			queryClient.setQueryData(userQueryKey, data.User);
			onSuccess?.();
		},
	});
};
