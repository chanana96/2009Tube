import { Link } from 'react-router-dom';
import BasicRating from '@/features/videos/components/BasicRating';
import { CardContent, Typography, Box, Stack } from '@mui/material';

export type VideoInfoProps = {
	video_title: string;
	createdAt: Date;
	username: string;
	video_id: string;
	rating_percentage: number;
	user_id: string | null;
};

export const VideoInfo: React.FC<VideoInfoProps> = ({
	video_title,
	createdAt,
	username,
	video_id,
	rating_percentage,
	user_id,
}) => {
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
					<Typography
						variant='body2'
						sx={{ fontSize: '1rem', paddingRight: '1rem' }}
						color='text.secondary'>
						{rating_percentage}% likes
					</Typography>
					{user_id && <BasicRating video_id={video_id} user_id={user_id} />}
					{!user_id && (
						<Typography
							variant='body2'
							sx={{ fontSize: '1rem' }}
							color='text.secondary'>
							<Link to='/auth/login'>Login</Link> to vote
						</Typography>
					)}
				</Stack>
			</Box>
			<Typography variant='body2' sx={{ color: 'text.secondary' }}>
				{'description'}
			</Typography>
		</CardContent>
	);
};
