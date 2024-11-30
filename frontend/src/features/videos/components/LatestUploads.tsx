import { useQuery } from '@tanstack/react-query';

import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Grid2,
	Box,
	CircularProgress,
} from '@mui/material';

const LatestUploads = () => {
	return (
		<Box sx={{ padding: 2 }}>
			<Grid2 container spacing={2}>
				<Grid2>
					<Card>
						<CardMedia
							component='img'
							height='140'
							image={undefined}
							alt={'video.title'}
						/>
						<CardContent>
							<Typography variant='h6'>{'video.title'}</Typography>
							<Typography variant='body2' color='text.secondary'>
								Uploaded on {new Date('video.createdAt').toLocaleDateString()}
							</Typography>
						</CardContent>
					</Card>
				</Grid2>
			</Grid2>
		</Box>
	);
};

export default LatestUploads;
