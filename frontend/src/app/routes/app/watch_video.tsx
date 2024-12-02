import { useSearchParams } from 'react-router-dom';
import VideoPlayer from '../../../features/videos/components/VideoPlayer';
import { useQuery } from '@tanstack/react-query';
import { doesVideoExist } from '@/features/videos/api/video_api';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Card, Divider } from '@mui/material';

import { VideoInfo } from '@/features/videos/components/VideoInfo';

export const WatchVideo = () => {
	const [searchParams] = useSearchParams();
	const video_id = searchParams.get('v') || '';

	const { data, isLoading, error } = useQuery({
		queryKey: ['video', video_id],
		queryFn: async () => await doesVideoExist(video_id),
	});

	if (isLoading) return <CircularProgress />;
	if (error) {
		return <Navigate to='/404' />;
	}
	const { message } = data || {};
	if (message === 'UPLOADING') return <div>Video is still uploading</div>;

	const { video_title, createdAt, url, username } = data || {};

	return (
		<Card sx={{ maxWidth: 1440, margin: 'auto', boxShadow: 3 }}>
			<VideoPlayer url={url} />
			<VideoInfo video_title={video_title} createdAt={createdAt} username={username} />
			<Divider sx={{ my: 2 }} />
		</Card>
	);
};
