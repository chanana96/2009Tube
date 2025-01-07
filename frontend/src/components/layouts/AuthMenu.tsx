import { IconButton, Box } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { UploadModal } from '@/features/videos/components/UploadModal';
import { useState } from 'react';
import { env } from '@/config';

const mobileMenuId = 'primary-search-account-menu-mobile';
const menuId = 'primary-search-account-menu';

export const AuthMenu = ({ setAnchorEl, setMobileMoreAnchorEl, profile_image }: any) => {
	const [open, setOpen] = useState(false);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<IconButton size='large' onClick={handleOpen}>
				<FileUploadIcon />
			</IconButton>
			<UploadModal handleClose={handleClose} open={open} />
			<IconButton
				size='large'
				edge='end'
				aria-label='account of current user'
				aria-controls={menuId}
				aria-haspopup='true'
				onClick={handleProfileMenuOpen}
				color='inherit'>
				<Avatar alt='avatar' src={`${env.CLOUDFRONT_URL}Avatars/${profile_image}`} />
			</IconButton>
			<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
				<IconButton
					size='large'
					aria-label='show more'
					aria-controls={mobileMenuId}
					aria-haspopup='true'
					onClick={handleMobileMenuClose}
					color='inherit'>
					<MoreIcon />
				</IconButton>
			</Box>
		</>
	);
};
