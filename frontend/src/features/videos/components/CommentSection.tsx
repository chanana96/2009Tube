import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import { useComments } from '../api/get-comments';
import { PostComment } from './PostComment';

type CommentSectionProps = {
	videoId: string;
	userId?: number | null;
};

export const CommentSection = ({ videoId, userId }: CommentSectionProps) => {
	const { data, isLoading, error } = useComments({ videoId });
	console.log(data);

	const mockComment = {
		user: 'John Doe',
		postedDate: '1 minute ago',
		avatarAlt: 'John Doe',
		avatarSrc: 'https://via.placeholder.com/150',
		text: 'This is a comment',
	};

	return (
		<div style={{ padding: 14 }} className='App'>
			<PostComment videoId={videoId} userId={userId} />

			<Paper style={{ padding: '40px 20px', marginTop: 10 }}>
				<Grid container wrap='nowrap' spacing={2}>
					<Grid>
						<Avatar alt={mockComment.avatarAlt} src={mockComment.avatarSrc} />
					</Grid>
					<Grid sx={{ justifyContent: 'left', width: '100%' }}>
						<h4 style={{ margin: 0, textAlign: 'left' }}>{mockComment.user}</h4>
						<p style={{ textAlign: 'left' }}>{mockComment.text}</p>
						<p style={{ textAlign: 'left', color: 'gray' }}>{mockComment.postedDate}</p>
					</Grid>
				</Grid>
				<Divider variant='fullWidth' style={{ margin: '30px 0' }} />
			</Paper>
		</div>
	);
};
