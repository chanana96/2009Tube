import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CameraAltOutlined from '@mui/icons-material/CameraAltOutlined';

export const ProfileAvatar = ({ profile_image }: { profile_image: string }) => {
	return (
		<Box
			sx={{
				'position': 'relative',
				'&:hover': {
					'cursor': 'pointer',
					'& .avatar-overlay': { opacity: 1 },
					'& .MuiAvatar-root': { filter: 'brightness(0.8)' },
				},
			}}>
			<Avatar alt='Profile Image' src={profile_image} sx={{ width: 120, height: 120 }} />
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
				<CameraAltOutlined sx={{ color: 'white' }} />
			</Box>
		</Box>
	);
};
