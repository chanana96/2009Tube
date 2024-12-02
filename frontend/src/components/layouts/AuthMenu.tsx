import { IconButton, Box } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BasicModal from '@/features/videos/components/UploadModal';
import { NavbarContext } from '@/contexts/navbar_context';
import { useContext, useState } from 'react';

export const AuthMenu = () => {
	const avatar = sessionStorage.getItem('avatar') || '';
	const [open, setOpen] = useState(false);
	const { setMobileMoreAnchorEl, setAnchorEl } = useContext(NavbarContext);
	const mobileMenuId = 'primary-search-account-menu-mobile';
	const menuId = 'primary-search-account-menu';
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<IconButton size='large' onClick={handleOpen}>
				<FileUploadIcon />
			</IconButton>
			<BasicModal handleClose={handleClose} open={open} />
			<IconButton
				size='large'
				edge='end'
				aria-label='account of current user'
				aria-controls={menuId}
				aria-haspopup='true'
				onClick={(event) => setAnchorEl(event.currentTarget)}
				color='inherit'>
				<Avatar alt='avatar' src={avatar} />
			</IconButton>
			<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
				<IconButton
					size='large'
					aria-label='show more'
					aria-controls={mobileMenuId}
					aria-haspopup='true'
					onClick={(event) => setMobileMoreAnchorEl(event.currentTarget)}
					color='inherit'>
					<MoreIcon />
				</IconButton>
			</Box>
		</>
	);
};
