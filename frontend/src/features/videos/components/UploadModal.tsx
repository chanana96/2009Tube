import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputFileUpload from './UploadButton';
import type { AuthMenuProps } from '@/types/navbar_types';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function BasicModal({
	handleClose,
	open,
}: Pick<AuthMenuProps, 'handleClose' | 'open'>) {
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Name your video
					</Typography>

					<InputFileUpload />
				</Box>
			</Modal>
		</div>
	);
}
