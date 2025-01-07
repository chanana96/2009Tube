import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { usePostComment } from '../api/post-comment';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostCommentInput, postCommentInputSchema } from '@/lib/schemas';

type PostCommentProps = {
	userId?: number | null;
	videoId: string;
};

export const PostComment = ({ userId, videoId }: PostCommentProps) => {
	const [commentAdornment, setCommentAdornment] = useState<boolean>(false);

	const form = useForm<PostCommentInput>({
		resolver: zodResolver(postCommentInputSchema),
	});
	const { register, handleSubmit, setError } = form;

	const onSuccess = () => {};

	const postComment = usePostComment({ onSuccess });

	const submitHandler: SubmitHandler<PostCommentInput> = (data) => {
		postComment.mutate({ userId, videoId, comment: data.comment });
	};
	const handleFocus = () => {
		setCommentAdornment(true);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (e.target.value === '') {
			setCommentAdornment(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)} className='mt-28 '>
			<TextField
				{...register('comment')}
				type='text'
				className='w-full'
				label='Add a comment'
				multiline
				required
				rows={3}
				variant='filled'
				sx={{ width: '100%' }}
				slotProps={{
					input: {
						endAdornment:
							commentAdornment ?
								<Button sx={{ top: 20 }} type='submit'>
									Comment
								</Button>
							:	null,
					},
				}}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
		</form>
	);
};
