import { useSearchParams } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useVideos } from '../api/get-videos';
import { VideoFeedType } from '@/types';
import { env } from '@/config/env';

export const VideosList = () => {
	const [searchParams] = useSearchParams();

	const videosQuery = useVideos({
		page: +(searchParams.get('page') || 1),
	});

	if (videosQuery.isLoading) {
		return <div>Loading videos..</div>;
	}

	const videos = videosQuery.data?.videos;

	if (!videos) {
		return null;
	}
	return (
		<Box sx={{ padding: 2 }}>
			<Grid container spacing={2} justifyContent='center'>
				{videos.map((video: VideoFeedType) => (
					<Grid key={video.video_uuid}>
						<Link
							to={`/watch?v=${video.video_uuid}`}
							style={{ textDecoration: 'none' }}>
							<Card
								sx={{
									width: 320,
									borderRadius: 2,
									boxShadow: 3,
									overflow: 'hidden',
									height: '100%',
								}}>
								<Box sx={{ position: 'relative' }}>
									<CardMedia
										component='img'
										sx={{
											width: 320,
											height: 200,
											objectFit: 'cover',
										}}
										image={`${env.CLOUDFRONT_URL}Videos/${video.video_uuid}/thumbnail.jpg`}
										alt={video.video_title}
									/>
									<Chip
										label={video.video_length}
										size='small'
										sx={{
											position: 'absolute',
											bottom: 8,
											right: 8,
											backgroundColor: 'rgba(0, 0, 0, 0.6)',
											color: 'white',
											fontWeight: 'bold',
											borderRadius: '8px',
											paddingX: 1,
										}}
									/>
								</Box>
								<CardContent>
									<Typography variant='h6' noWrap>
										{video.video_title}
									</Typography>
									<Typography
										variant='body2'
										color='text.secondary'
										sx={{ mb: 1 }}>
										Uploaded on {new Date(video.createdAt).toLocaleDateString()}{' '}
										by {video['user.username']}
									</Typography>
									<Typography
										variant='body2'
										color='text.secondary'
										sx={{ mb: 1 }}>
										{video.rating} out of {video.rating_pool} people liked this
										video
									</Typography>
								</CardContent>
							</Card>
						</Link>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};
