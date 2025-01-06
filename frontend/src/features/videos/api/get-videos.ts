import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/config';
import { QueryConfigType } from '@/config';
import { VideoFeedType } from '@/types';

export const getVideos = (page = 1): Promise<{ videos: VideoFeedType[] }> => {
	return api.get('/query/video/feed', {
		params: {
			page,
		},
	});
};

export const getVideosQueryOptions = ({ page }: { page?: number } = {}) => {
	return queryOptions({
		queryKey: page ? ['videos', { page }] : ['videos'],
		queryFn: () => getVideos(page),
	});
};

type UseVideosOptions = {
	page?: number;
	queryConfig?: QueryConfigType<typeof getVideosQueryOptions>;
};

export const useVideos = ({ queryConfig, page }: UseVideosOptions = {}) => {
	return useQuery({
		...getVideosQueryOptions({ page }),
		...queryConfig,
	});
};
