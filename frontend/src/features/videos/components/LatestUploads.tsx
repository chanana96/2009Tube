import { useQuery } from '@tanstack/react-query';
import { Box, CircularProgress } from '@mui/material';
import { IterableVideo } from '@/features/videos/components/IterableVideo';
import Grid from '@mui/material/Grid2';
import { fetchVideoFeed } from '@/features/videos/api/video_api';
export type Video = {
	'video_uuid': string;
	'video_title': string;
	'createdAt': string;
	'user.username': string;
	'video_length': number;
	'rating': number;
	'rating_pool': number;
};
const LatestUploads = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['feed'],
		queryFn: async () => fetchVideoFeed(),
	});
	if (isLoading) return <CircularProgress />;
	return (
		<Box sx={{ padding: 2 }}>
			<Grid container spacing={2} justifyContent='center'>
				{data.videos.map((video: Video) => (
					<IterableVideo key={video.video_uuid} video={video} />
				))}
			</Grid>
		</Box>
	);
};

export default LatestUploads;
