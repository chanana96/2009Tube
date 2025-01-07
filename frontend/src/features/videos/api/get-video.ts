import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/config';
import { QueryConfigType } from '@/config';
import { Video } from '@/types';

export const getVideo = ({ videoId }: { videoId: string }): Promise<Video> => {
	return api.get(`/query/video/${videoId}`);
};

export const getVideoQueryOptions = (videoId: string) => {
	return queryOptions({
		queryKey: ['videos', videoId],
		queryFn: () => getVideo({ videoId }),
	});
};

type UseVideoOptions = {
	videoId: string;
	queryConfig?: QueryConfigType<typeof getVideoQueryOptions>;
};

export const useVideo = ({ videoId, queryConfig }: UseVideoOptions) => {
	return useQuery({
		...getVideoQueryOptions(videoId),
		...queryConfig,
	});
};
