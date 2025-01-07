import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config';

export const uploadAvatar = ({
	data,
}: {
	data: { file: File; username: string };
}): Promise<void> => {
	const { file, username } = data;
	const formData = new FormData();
	formData.append('avatar', file);
	return api.post(`/auth/avatar/${username}`, formData, {
		headers: {
			'content-type': 'multipart/form-data',
		},
	});
};

export const useUploadAvatar = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: uploadAvatar,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
	});
};
