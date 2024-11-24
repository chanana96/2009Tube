import React, { useContext } from 'react';
import { Box, Avatar, Typography, Paper } from '@mui/material';
import { UserContext } from '@/contexts/user_context';
export const ProfileContainer = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('Out of provider scope');
	}
	const { user, isAuth } = context;

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 2,
				p: 2,
				width: '75%',
				margin: '0 auto',
			}}>
			<Box
				sx={{
					width: '100%',
					height: 200,
					backgroundColor: 'primary.main',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					color: 'white',
				}}></Box>

			<Avatar
				alt='Profile Image'
				src='https://images.chesscomfiles.com/uploads/v1/user/363134875.3d7dead4.50x50o.376fbd927dea.jpg'
				sx={{ width: 100, height: 100 }}
			/>

			<Typography variant='h5'>{user}</Typography>

			<Paper sx={{ p: 2, width: '100%', maxWidth: 600 }}>
				<Typography variant='h6'>Bio</Typography>
				<Typography variant='body1'>lorem ipsum or something</Typography>
			</Paper>
		</Box>
	);
};
