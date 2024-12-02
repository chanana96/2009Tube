import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import { uploadVideo, uploadVideoGetId } from '@/features/videos/api/video_api';
import { useNavigate } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

export default function InputFileUpload({ handleClose }: { handleClose: () => void }) {
	const [file, setFile] = React.useState<File | null>(null);
	const [title, setTitle] = React.useState('');
	const navigate = useNavigate();

	const user_uuid = sessionStorage.getItem('user_uuid') || null;

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFile(event.target.files?.[0] || null);
		setTitle(event.target.files?.[0]?.name.replace(/\.[^/.]+$/, '') || '');
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file || !user_uuid) return;

		const { video_id } = await uploadVideoGetId(user_uuid);

		navigate(`/watch?v=${video_id}`);
		handleClose();
		await uploadVideo({
			useruuid: user_uuid,
			file: file,
			title: title,
			video_id: video_id,
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextField value={title} onChange={(e) => setTitle(e.target.value)} />
			<Button
				component='label'
				role={undefined}
				variant='contained'
				tabIndex={-1}
				startIcon={<CloudUploadIcon />}>
				Upload video
				<VisuallyHiddenInput
					type='file'
					name='video'
					accept='video/*'
					onChange={handleFileUpload}
				/>
			</Button>
			<Button variant='contained' type='submit'>
				Submit
			</Button>
		</form>
	);
}
