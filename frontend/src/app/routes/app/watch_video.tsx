import BasicRating from '@/features/videos/components/BasicRating';
import { useSearchParams } from 'react-router-dom';
import VideoPlayer from '../../../features/videos/components/VideoPlayer';
import { useQuery } from '@tanstack/react-query';
import { doesVideoExist } from '@/features/videos/api/video_api';
import { Navigate } from 'react-router-dom';
import {
	CircularProgress,
	Card,
	CardContent,
	Typography,
	Box,
	Divider,
	Stack,
} from '@mui/material';

export const WatchVideo = () => {
	const [searchParams] = useSearchParams();
	const video_id = searchParams.get('v') || '';

	const { data, isLoading, error } = useQuery({
		queryKey: ['video', video_id],
		queryFn: async () => await doesVideoExist(video_id),
	});

	const { video_title, createdAt, url, user_uuid } = data ?? {};

	if (isLoading) return <CircularProgress />;
	if (error) {
		return <Navigate to='/404' />;
	}

	return (
		<Card sx={{ maxWidth: 1440, margin: 'auto', boxShadow: 3 }}>
			<VideoPlayer url={url} />

			<CardContent>
				<Typography variant='h6' component='div' sx={{ fontWeight: 600, lineHeight: 1.2 }}>
					{video_title}
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography variant='body2' color='text.secondary'>
						Uploaded on {new Date(createdAt).toLocaleDateString()}
					</Typography>
					<Stack direction='row' alignItems='center' spacing={1}>
						<Typography variant='body2' color='text.secondary'></Typography>
						<BasicRating />
					</Stack>
				</Box>
				<Typography variant='body2' sx={{ color: 'text.secondary' }}>
					{'description'}
				</Typography>
			</CardContent>
			<Divider sx={{ my: 2 }} />
		</Card>
	);
};
