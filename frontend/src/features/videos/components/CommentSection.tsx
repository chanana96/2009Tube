import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Comment } from '../types';
import Button from '@mui/material/Button';

export const CommentSection = ({ video_id, user_id }: { video_id: string; user_id: string }) => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [comment, setComment] = useState<string>('');
	const [commentAdornment, setCommentAdornment] = useState<boolean>(false);
	const user = 'John Doe';
	const postedDate = '1 minute ago';
	const avatarAlt = 'John Doe';
	const avatarSrc = 'https://via.placeholder.com/150';
	const text = 'This is a comment';
	const handleAddComment = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log(comment);
	};
	return (
		<div style={{ padding: 14 }} className='App'>
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
