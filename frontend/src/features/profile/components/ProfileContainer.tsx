import { Box, Avatar, Typography, CircularProgress } from '@mui/material';
import { CameraAltOutlined as CameraAltOutlinedIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { getProfile } from '@/features/profile/api/find_profile_api';
import Card from '@mui/material/Card';
import { useState } from 'react';
import { uploadAvatar } from '@/features/profile/api/find_profile_api';

interface ProfileContainerProps {
	username: string;
}

export const ProfileContainer = ({ username }: ProfileContainerProps) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['profile', username],
		queryFn: () => getProfile(username),
	});

	if (isLoading) return <CircularProgress />;
	if (error) return <Navigate to='/404' />;

	const { createdAt, bio, profile_image } = data?.data ?? {};

	const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files?.[0]) {
			return;
		}
		await uploadAvatar(event.target.files?.[0], username);
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
						<Box
							sx={{
								'position': 'relative',
								'&:hover': {
									'cursor': 'pointer',
									'& .avatar-overlay': { opacity: 1 },
									'& .MuiAvatar-root': { filter: 'brightness(0.8)' },
								},
							}}>
							<Avatar
								alt='Profile Image'
								src={profile_image}
								sx={{ width: 120, height: 120 }}
							/>
							<Box
								className='avatar-overlay'
								sx={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									opacity: 0,
									transition: 'opacity 0.3s',
								}}>
								<CameraAltOutlinedIcon sx={{ color: 'white' }} />
							</Box>
						</Box>
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
