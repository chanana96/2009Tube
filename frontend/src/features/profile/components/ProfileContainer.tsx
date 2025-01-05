import { Box, Typography, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { getProfile } from '../api/find-profile-api';
import Card from '@mui/material/Card';
import { useAvatarMutation } from '@/hooks/useAvatar';
import { ProfileAvatar } from './ProfileAvatar';

interface ProfileContainerProps {
	username: string;
}

export const ProfileContainer = ({ username }: ProfileContainerProps) => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['profile', username],
		queryFn: () => getProfile(username),
	});
	const { mutate } = useAvatarMutation();
	if (isLoading) return <CircularProgress />;
	if (error) return <Navigate to='/404' />;

	const { createdAt, bio, profile_image } = data?.data ?? {};

	const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files?.[0]) {
			return;
		}

		mutate({ file: event.target.files[0], username });
		sessionStorage.removeItem('avatar');
		refetch();
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box
				sx={{
					height: '300px',
					bgcolor: 'grey.200',
					position: 'relative',
					width: '100%',
					mt: 0,
				}}>
				<Box sx={{ position: 'absolute', bottom: '-60px', left: '5%' }}>
					<label htmlFor='avatar' style={{ display: 'block', cursor: 'pointer' }}>
						<ProfileAvatar profile_image={profile_image} />
					</label>
					<input
						type='file'
						name='avatar'
						hidden
						accept='image/*'
						onChange={handleFileUpload}
						id='avatar'
					/>
				</Box>
			</Box>

			<Card
				sx={{
					maxWidth: '800px',
					mx: 'auto',
					mt: 10,
					p: 3,
				}}>
				<Typography variant='h4'>{username}</Typography>
				<Typography variant='body1' color='text.secondary' sx={{ mt: 1 }}>
					{bio || 'No bio yet'}
				</Typography>
				<Typography variant='caption' display='block' sx={{ mt: 1 }}>
					Joined {new Date(createdAt).toLocaleDateString()}
				</Typography>
			</Card>
		</Box>
	);
};
