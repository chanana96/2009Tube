import { Link } from 'react-router-dom';
import { Box, Typography, Button, Stack } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const NotFoundRoute = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: 'calc(100vh - 64px)',
				p: 3,
				textAlign: 'center',
			}}>
			<Stack spacing={3} alignItems='center'>
				<ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main' }} />
				<Typography variant='h2' component='h1'>
					404
				</Typography>
				<Typography variant='h5' color='text.secondary'>
					Page Not Found
				</Typography>
				<Typography variant='body1' color='text.secondary'>
					The page you're looking for doesn't exist or has been moved.
				</Typography>
				<Link to='/' style={{ textDecoration: 'none' }}>
					<Button variant='contained' size='large'>
						Back to Home
					</Button>
				</Link>
			</Stack>
		</Box>
	);
};
