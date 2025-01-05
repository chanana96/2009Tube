import { Menu, MenuItem } from '@mui/material';
import { MENU_POSITION_PROPS } from '@/config/menuposition';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/features/auth/api/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const NavbarMenus = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

	const navigate = useNavigate();
	const { user } = useAuth();

	const handleProfileClick = () => {
		navigate(`/user/profile/${user}`);
		setAnchorEl(null);
	};

	const handleLogout = () => {
		setAnchorEl(null);
		logout();
	};
	const handleAccountClick = () => {
		navigate('/account/settings/');
		setAnchorEl(null);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
		setMobileMoreAnchorEl(null);
	};
	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const menuProps = {
		...MENU_POSITION_PROPS,
		id: 'primary-search-account-menu',
		anchorEl: anchorEl || null,
		open: isMenuOpen,
		onClose: handleMenuClose,
	};
	return (
		<>
			<Menu {...menuProps}>
				<MenuItem onClick={handleProfileClick}>Profile</MenuItem>
				<MenuItem onClick={handleAccountClick}>Account</MenuItem>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>

			<Menu
				{...MENU_POSITION_PROPS}
				id='primary-search-account-menu-mobile'
				anchorEl={mobileMoreAnchorEl}
				open={isMobileMenuOpen}
				onClose={handleMobileMenuClose}>
				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
				<MenuItem onClick={handleAccountClick}>Account</MenuItem>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</>
	);
};
