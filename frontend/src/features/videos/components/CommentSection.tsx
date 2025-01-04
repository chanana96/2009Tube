import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Comment } from '../types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@mui/material/Button';
import { postComment, getComments } from '../api/video_api';

export const CommentSection = ({
	video_id,
	user_id,
}: {
	video_id: string;
	user_id: string | null;
}) => {
	const queryClient = useQueryClient();
	const [comment, setComment] = useState<string>('');
	const [commentAdornment, setCommentAdornment] = useState<boolean>(false);

	const { data: comments = [] } = useQuery({
		queryKey: ['comments', video_id],
		queryFn: () => getComments(video_id),
	});

	const { mutate: submitComment } = useMutation({
		mutationFn: () => postComment({ comment, user_id: user_id!, video_id }),
		onMutate: async (newComment) => {
			await queryClient.cancelQueries({ queryKey: ['comments', video_id] });

			const previousComments = queryClient.getQueryData(['comments', video_id]);

			queryClient.setQueryData(['comments', video_id], (old: Comment[] = []) => [
				{
					comment,
					user_id,
					video_id,
					created_at: new Date().toISOString(),
				},
				...old,
			]);

			return { previousComments };
		},
		onError: (err, newComment, context) => {
			queryClient.setQueryData(['comments', video_id], context?.previousComments);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['comments', video_id] });
		},
	});

	const user = 'John Doe';
	const postedDate = '1 minute ago';
	const avatarAlt = 'John Doe';
	const avatarSrc = 'https://via.placeholder.com/150';
	const text = 'This is a comment';
	const handleAddComment = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!user_id || !comment.trim()) return;
		submitComment();
	};
	return (
		<div style={{ padding: 14 }} className='App'>
			{!user_id && <div>You must be logged in to comment</div>}
			{user_id && (
				<TextField
					id='standard-multiline-static'
					label='Add a comment'
					multiline
					rows={3}
					variant='filled'
					sx={{ width: '100%' }}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					slotProps={{
						input: {
							endAdornment:
								commentAdornment ?
									<Button sx={{ top: 20 }} onClick={handleAddComment}>
										Comment
									</Button>
								:	null,
						},
					}}
					onFocus={() => {
						setCommentAdornment(true);
					}}
					onBlur={(e) => {
						e.target.value == '' ? setCommentAdornment(false) : null;
					}}
				/>
			)}

			<Paper style={{ padding: '40px 20px', marginTop: 10 }}>
				<Grid container wrap='nowrap' spacing={2}>
					<Grid>
						<Avatar alt={avatarAlt} src={avatarSrc} />
					</Grid>
					<Grid sx={{ justifyContent: 'left', width: '100%' }}>
						<h4 style={{ margin: 0, textAlign: 'left' }}>{user}</h4>
						<p style={{ textAlign: 'left' }}>{text}</p>
						<p style={{ textAlign: 'left', color: 'gray' }}>{postedDate}</p>
					</Grid>
				</Grid>
				<Divider variant='fullWidth' style={{ margin: '30px 0' }} />
			</Paper>
		</div>
	);
};
