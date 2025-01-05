import { useQuery } from '@tanstack/react-query';
import { Box, CircularProgress } from '@mui/material';
import { IterableVideo } from '@/features/videos/components/IterableVideo';
import Grid from '@mui/material/Grid2';
import { fetchVideoFeed } from '@/features/videos/api/video-api';
import { VideoFeedType } from '@/types';

const LatestUploads = () => {
	// const { data, isLoading } = useQuery({
	// 	queryKey: ['feed'],
	// 	queryFn: async () => fetchVideoFeed(),
	// });
	// if (isLoading) return <CircularProgress />;
	return (
		<Box sx={{ padding: 2 }}>
			<Grid container spacing={2} justifyContent='center'>
				{/* {data.videos.map((video: VideoFeedType) => (
					<IterableVideo key={video.video_uuid} video={video} />
				))} */}
			</Grid>
		</Box>
	);
};

export default LatestUploads;
