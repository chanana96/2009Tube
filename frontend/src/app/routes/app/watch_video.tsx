import { useSearchParams } from 'react-router-dom';
import VideoPlayer from '../../../features/videos/components/VideoPlayer';
import { useQuery } from '@tanstack/react-query';
import { doesVideoExist } from '@/features/videos/api/video_api';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Card, Divider } from '@mui/material';
import { io } from 'socket.io-client';
import { VideoInfo } from '@/features/videos/components/VideoInfo';
import { useState, useEffect } from 'react';
import { CommentSection } from '@/features/videos/components/CommentSection';
const IO_URL = import.meta.env.VITE_IO_URL;

export const WatchVideo = () => {
	const [searchParams] = useSearchParams();
	const video_id = searchParams.get('v') || '';
	const [progress, setProgress] = useState(0);
	const { data, isLoading, error } = useQuery({
		queryKey: ['video', video_id],
		queryFn: async () => await doesVideoExist(video_id),
	});
	const user_id = sessionStorage.getItem('user_uuid') || null;
	if (isLoading) return <CircularProgress />;
	if (error) {
		return <Navigate to='/404' />;
	}

	const { message, video_title, createdAt, url, username, rating_percentage } = data || {};

	if (message === 'UPLOADING') {
		useEffect(() => {
			const socket = io(IO_URL);
			socket.on(video_id, (progress) => {
				setProgress(progress);
			});
			return () => {
				socket.disconnect();
			};
		}, [video_id]);

		return <div>Video is still uploading, processing: {progress}%</div>;
	}

	return (
		<Card sx={{ maxWidth: 1440, margin: 'auto', boxShadow: 3 }}>
			<VideoPlayer url={url} />
			<VideoInfo
				video_title={video_title}
				createdAt={createdAt}
				username={username}
				video_id={video_id}
				rating_percentage={rating_percentage}
				user_id={user_id}
			/>
			<Divider sx={{ my: 2 }} />
			<CommentSection video_id={video_id} user_id={user_id} />
		</Card>
	);
};
