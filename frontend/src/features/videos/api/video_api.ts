import axios from 'axios';
interface video {
	useruuid: string;
	file: File;
	title: string;
}
export const uploadVideo = async ({ useruuid, file, title = 'Untitled video' }: video) => {
	const formData = new FormData();
	formData.append('video', file);
	formData.append('title', title);

	const response = await axios.post(`/api/auth/upload/${useruuid}`, formData);

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
