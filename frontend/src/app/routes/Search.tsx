import { useSearchParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { fetchSearch } from '@/features/videos/api/video_api';
import { useQuery } from '@tanstack/react-query';
import { IterableVideo } from '../../features/videos/components/IterableVideo';

export type Video = {
	'video_uuid': string;
	'video_title': string;
	'createdAt': string;
	'user.username': string;
	'video_length': number;
	'rating': number;
	'rating_pool': number;
};

const Search = () => {
	const [searchParams] = useSearchParams();
	const search = searchParams.get('q') || '';
	const { data, isLoading } = useQuery({
		queryKey: ['search', search],
		queryFn: async () => fetchSearch(search),
	});
	if (isLoading) return <CircularProgress />;

	return (
		<Box sx={{ padding: 2 }}>
			{(!data?.searchResult || data.searchResult.length === 0) && (
				<div>Nothing matched "{search}"..</div>
			)}
			<Grid container spacing={2} justifyContent='center'>
				{data?.searchResult?.map((video: Video) => (
					<IterableVideo key={video.video_uuid} video={video} />
				))}
			</Grid>
		</Box>
	);
};
export default Search;
