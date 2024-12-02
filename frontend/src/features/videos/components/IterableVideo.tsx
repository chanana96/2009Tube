import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import type { Video } from '@/features/videos/components/LatestUploads';

interface IterableVideoProps {
	video: Video;
}

const BUCKET_URL = import.meta.env.VITE_BUCKET_URL;

export const IterableVideo: React.FC<IterableVideoProps> = ({ video }) => {
	return (
		<Grid>
			<Link to={`/watch?v=${video.video_uuid}`} style={{ textDecoration: 'none' }}>
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
							image={`${BUCKET_URL}${video.video_uuid}/thumbnail.jpg`}
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
						<Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
							Uploaded on {new Date(video.createdAt).toLocaleDateString()} by{' '}
							{video['user.username']}
						</Typography>
					</CardContent>
				</Card>
			</Link>
		</Grid>
	);
};
