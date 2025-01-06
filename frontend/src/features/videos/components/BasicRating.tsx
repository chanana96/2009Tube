import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { rateVideo } from '../api/watch-api';
import Alert from '@mui/material/Alert';

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#ff6d75',
	},
	'& .MuiRating-iconHover': {
		color: '#ff3d47',
	},
});
const AlertWrapper = styled('div')({
	position: 'absolute',
	left: '64%',
	right: '18%',
	zIndex: 1000,
});

export default function BasicRating({ video_id, user_id }: { video_id: string; user_id: string }) {
	const [ratings, setRatings] = React.useState<{ like: number; dislike: number }>({
		like: 0,
		dislike: 0,
	});
	const [ratingSuccess, setRatingSuccess] = React.useState<boolean | null>(null);
	//todo change to star based rating
	const handleClick = async (e: React.MouseEvent, rating: string) => {
		e.preventDefault();
		let like = 0;
		if (rating === 'like') {
			setRatings({ like: 1, dislike: 0 });
			like = 1;
		} else {
			setRatings({ like: 0, dislike: 1 });
			like = -1;
		}
		const response = await rateVideo(video_id, like, user_id);
		if (response.error) {
			setRatings({ like: 0, dislike: 0 });
			setRatingSuccess(false);
		} else {
			setRatingSuccess(true);
		}
	};

	return (
		<Box sx={{ '& > legend': { mt: 2 } }}>
			<StyledRating
				value={ratings.like}
				onClick={(e) => handleClick(e, 'like')}
				name='like'
				defaultValue={0}
				max={1}
				precision={1}
				icon={<ThumbUpAltIcon fontSize='inherit' color='success' />}
				emptyIcon={<ThumbUpOffAltIcon fontSize='inherit' />}
			/>
			<StyledRating
				name='dislike'
				value={ratings.dislike}
				onClick={(e) => handleClick(e, 'dislike')}
				defaultValue={0}
				max={1}
				precision={1}
				icon={<ThumbDownAltIcon fontSize='inherit' />}
				emptyIcon={<ThumbDownOffAltIcon fontSize='inherit' />}
			/>
			{ratingSuccess !== null && (
				<AlertWrapper>
					<Alert
						severity={ratingSuccess ? 'success' : 'error'}
						onClose={() => {
							setRatingSuccess(null);
						}}>
						{ratingSuccess ?
							'Rating submitted successfully'
						:	'You have already voted on this video'}
					</Alert>
				</AlertWrapper>
			)}
		</Box>
	);
}
