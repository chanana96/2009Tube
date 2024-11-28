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
