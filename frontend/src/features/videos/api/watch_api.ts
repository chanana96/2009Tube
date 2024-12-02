import axios from 'axios';

const submitRating = async (
	user_id: string,
	video_id: string,
	rating: number,
	previousUserRating?: number,
) => {
	await axios.post('/api/auth/submit/rating', { user_id, video_id, rating, previousUserRating });
};
