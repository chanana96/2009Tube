import { Navigate, useLocation } from 'react-router-dom';
import { paths } from '@/config/paths';
import { getUser, registerUser, loginUser, logoutUser } from '@/features/auth/api/auth';
import { useMutation, useQueryClient, queryOptions } from '@tanstack/react-query';
import { configureAuth } from './react-query-auth';
import { LoginInput, RegisterInput } from '@/features/auth/types';

const authConfig = {
	userFn: getUser,
	loginFn: async (data: LoginInput) => {
		const response = await loginUser(data);
		return response.user;
	},
	registerFn: async (data: RegisterInput) => {
		const response = await registerUser(data);
		return response.user;
	},
	logoutFn: logoutUser,
};

export const { useUser, useLogout, AuthLoader } = configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const user = useUser();
	const location = useLocation();
	if (!user.data) {
		return <Navigate to={paths.auth.login.getHref(location.pathname)} replace />;
	}

	return children;
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
