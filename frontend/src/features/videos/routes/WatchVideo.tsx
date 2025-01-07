import { useSearchParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Card, Divider } from '@mui/material';
import { VideoInfo } from '../components/VideoInfo';
import { useState, useEffect } from 'react';
import { CommentSection } from '../components/CommentSection';
import { useVideo } from '../api/get-video';
import { useUser } from '@/hooks/useAuth';

const WatchVideo = () => {
	const [searchParams] = useSearchParams();
	const videoId = searchParams.get('v') || '';
	const { data, isLoading, error } = useVideo({ videoId });
	const { data: user } = useUser();
	if (isLoading) return <CircularProgress />;
	if (error) {
		return <Navigate to='/404' />;
	}

	const { createdAt, rating_percentage, url, username, video_title } = data!;
	// if (message === 'UPLOADING') {
	// 	useEffect(() => {
	// 		const socket = io(IO_URL);
	// 		socket.on(video_id, (progress) => {
	// 			setProgress(progress);
	// 		});
	// 		return () => {
	// 			socket.disconnect();
	// 		};
	// 	}, [video_id]);

	// 	return <div>Video is still uploading, processing: {progress}%</div>;
	// }

	return (
		<Card sx={{ maxWidth: 1440, margin: 'auto', boxShadow: 3 }}>
			<VideoPlayer url={url} />
			<VideoInfo
				video_title={video_title}
				createdAt={createdAt}
				username={username}
				rating_percentage={rating_percentage}
			/>
			<Divider sx={{ my: 2 }} />
			<CommentSection videoId={videoId} userId={user?.id} />
		</Card>
	);
};
export default WatchVideo;
