import { useQuery, queryOptions } from '@tanstack/react-query';
import { api } from '@/config';
import { QueryConfigType } from '@/config';

type CommentsType = {};

export const getComments = ({ videoId }: { videoId: string }): Promise<CommentsType> => {
	return api.get(`/query/comments/${videoId}`);
};

export const getCommentsQueryOptions = (videoId: string) => {
	return queryOptions({
		queryKey: ['comments', videoId],
		queryFn: () => getComments({ videoId }),
	});
};

type UseCommentsOptions = {
	videoId: string;
	queryConfig?: QueryConfigType<typeof getCommentsQueryOptions>;
};

export const useComments = ({ videoId, queryConfig }: UseCommentsOptions) => {
	return useQuery({
		...getCommentsQueryOptions(videoId),
		...queryConfig,
	});
};
