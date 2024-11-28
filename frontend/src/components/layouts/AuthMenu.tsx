import { IconButton, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import type { AuthMenuProps } from '@/types/navbar_types';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BasicModal from '@/features/videos/components/UploadModal';
export const AuthMenu = ({
	menuId,
	handleProfileMenuOpen,
	mobileMenuId,
	handleMobileMenuOpen,
	avatar,
	handleOpen,
	handleClose,
	open,
}: AuthMenuProps) => {
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
				onClick={handleProfileMenuOpen}
				color='inherit'>
				<Avatar alt='avatar' src={avatar} />
			</IconButton>
			<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
				<IconButton
					size='large'
					aria-label='show more'
					aria-controls={mobileMenuId}
					aria-haspopup='true'
					onClick={handleMobileMenuOpen}
					color='inherit'>
					<MoreIcon />
				</IconButton>
			</Box>
		</>
	);
};
