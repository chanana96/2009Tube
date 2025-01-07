import { Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import { useUploadAvatar } from '../api/upload-avatar-api';
import { ProfileAvatar } from './ProfileAvatar';
import { useUser } from '@/hooks/useAuth';
import { env, paths } from '@/config';

interface ProfileContainerProps {
	username: string;
}
//todo: this only displays your own profile right now, need to make mutation function to query profiles by username prop
export const ProfileContainer = ({ username }: ProfileContainerProps) => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');
	const { data: user, isLoading } = useUser();

	if (isLoading) return <CircularProgress />;
	if (!user) {
		navigate(`${redirectTo ? `${redirectTo}` : paths.home.path}`, {
			replace: true,
		});
		return null;
	}
	const { createdAt, bio, profile_image } = user;

	const { mutate } = useUploadAvatar();
	const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files?.[0]) {
			return;
		}
		mutate({ data: { file: event.target.files[0], username } });
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
						<ProfileAvatar
							profile_image={`${env.CLOUDFRONT_URL}Avatars/${profile_image}`}
						/>
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
