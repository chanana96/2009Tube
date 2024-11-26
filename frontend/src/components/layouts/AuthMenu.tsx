import { IconButton, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import type { AuthMenuProps } from '@/types/navbar_types';

export const AuthMenu = ({
	menuId,
	handleProfileMenuOpen,
	mobileMenuId,
	handleMobileMenuOpen,
}: AuthMenuProps) => {
	return (
		<>
			<IconButton
				size='large'
				edge='end'
				aria-label='account of current user'
				aria-controls={menuId}
				aria-haspopup='true'
				onClick={handleProfileMenuOpen}
				color='inherit'>
				<AccountCircle />
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
