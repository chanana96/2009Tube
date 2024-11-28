import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadAvatar } from '@/features/profile/api/find_profile_api';

export const useAvatarMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ file, username }: { file: File; username: string }) => {
			try {
				await uploadAvatar(file, username);
			} catch (error) {
				console.error(error);
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] });
			sessionStorage.removeItem('avatar');
		},
	});
};
