import { Link } from 'react-router-dom';
import BasicRating from '@/features/videos/components/BasicRating';
import { CardContent, Typography, Box, Stack } from '@mui/material';

export type VideoInfoProps = {
	video_title: string;
	createdAt: Date;
	username: string;
};

export const VideoInfo: React.FC<VideoInfoProps> = ({ video_title, createdAt, username }) => {
	return (
		<CardContent>
			<Typography variant='h6' component='div' sx={{ fontWeight: 600, lineHeight: 1.2 }}>
				{video_title}
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography variant='body2' color='text.secondary'>
					Uploaded on {new Date(createdAt).toLocaleDateString()} by{' '}
					<Link to={`/user/profile/${username}`}>{username}</Link>
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
	);
};
