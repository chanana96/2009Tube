import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config';
import { UseAuthProps } from '@/hooks/useAuth';
import { NewUsernameOrPasswordInput } from '@/lib/schemas';

export const updateSettings = (data: NewUsernameOrPasswordInput): Promise<void> => {
	return api.post('/auth/update', data);
};

export const useUpdateSettings = ({ onSuccess }: UseAuthProps) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateSettings,
		onSuccess: (data) => {
			queryClient.setQueryData(['user'], data);
			queryClient.invalidateQueries({ queryKey: ['user'] });
			onSuccess?.();
		},
	});
};
