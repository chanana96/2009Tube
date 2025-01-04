import axios from 'axios';

interface Video {
	useruuid: string;
	file: File;
	title: string;
	video_id: string;
}

const progressToUpload = async (progress: number, video_id: string) => {
	await axios.post('/api/auth/progress', { progress: progress, video_id: video_id });
};

export const uploadVideo = async ({
	useruuid,
	file,
	title = 'Untitled video',
	video_id,
}: Video) => {
	const formData = new FormData();
	formData.append('video', file);
	formData.append('title', title);
	formData.append('video_id', video_id);
	const response = await axios.post(`/api/auth/upload/${useruuid}`, formData, {
		onUploadProgress: (progressEvent) => {
			if (progressEvent) {
				let percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total!,
				);
				progressToUpload(percentCompleted, video_id);
			}
		},
	});

	return response.data;
};

export const uploadVideoGetId = async (useruuid: string) => {
	const response = await axios.get(`/api/auth/upload/${useruuid}`);
	return response.data;
};

export const fetchVideoChunk = async (start: number, end: number, video_id: string) => {
	try {
		const response = await axios.get(`/api/stream/${video_id}`, {
			headers: {
				Range: `bytes=${start}-${end}`,
			},
			responseType: 'arraybuffer',
		});

		return response.data;
	} catch (error) {
		console.error('Error fetching video chunk:', error);
	}
};

export const doesVideoExist = async (video_id: string) => {
	try {
		const response = await axios.get(`/api/query/video/${video_id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching video:', error);
	}
};

export const fetchVideoFeed = async () => {
	try {
		const response = await axios.get('/api/query/video/feed');
		return response.data;
	} catch (error) {
		console.error('Error fetching video feed:', error);
	}
};

export const fetchSearch = async (searchParams: string) => {
	try {
		const response = await axios.get(`/api/query/search/${searchParams}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching search', error);
	}
};

export const postComment = async ({
	comment,
	user_id,
	video_id,
}: {
	comment: string;
	user_id: string;
	video_id: string;
}) => {
	try {
		const response = await axios.post(`/api/auth/submit/comment/${video_id}`, {
			comment,
			user_id,
		});
		return response.data;
	} catch (error) {
		console.error('Error posting comment', error);
	}
};

export const getComments = async (video_id: string) => {
	try {
		const response = await axios.get(`/api/query/comments/${video_id}`);
		return response.data;
	} catch (error) {
		console.error('Error getting comments', error);
	}
};
