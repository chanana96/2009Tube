import { Menu, MenuItem } from '@mui/material';
import { MENU_POSITION_PROPS } from '@/config/menuposition';
import type { NavbarMenusProps } from '@/types/navbar_types';

export const NavbarMenus = ({
	anchorEl,
	mobileMoreAnchorEl,
	handleMenuClose,
	handleLogout,
	handleMobileMenuClose,
	isMenuOpen,
	isMobileMenuOpen,
	navigate,
	user,
}: NavbarMenusProps) => {
	const handleProfileClick = () => {
		handleMenuClose();
		navigate(`/user/profile/${user}`);
	};
	const handleAccountClick = () => {
		handleMenuClose();
		navigate('/account/settings/');
	};

	return (
		<>
			<Menu
				{...MENU_POSITION_PROPS}
				id='primary-search-account-menu'
				anchorEl={anchorEl}
				open={isMenuOpen}
				onClose={handleMenuClose}>
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
