import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/config';
import { UseAuthProps } from '@/hooks/useAuth';

export type PostCommentType = {
	comment: string;
	userId?: number | null;
	videoId: string;
};

export const postComment = async ({ comment, userId, videoId }: PostCommentType) => {
	const response = await api.post(`/auth/submit/comment/${videoId}`, { comment, userId });
	return response;
};

export const usePostComment = ({ onSuccess }: UseAuthProps) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: postComment,
		onSuccess: (videoId) => {
			queryClient.setQueryData(['comments'], videoId);
			queryClient.invalidateQueries({ queryKey: ['comments'] });
			onSuccess?.();
		},
	});
};
