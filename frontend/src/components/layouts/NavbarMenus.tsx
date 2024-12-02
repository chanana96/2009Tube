import { Menu, MenuItem } from '@mui/material';
import { MENU_POSITION_PROPS } from '@/config/menuposition';
import { NavbarContext } from '@/contexts/navbar_context';
import { useContext } from 'react';

export const NavbarMenus = () => {
	const {
		handleProfileClick,
		handleAccountClick,
		handleLogout,
		handleMenuClose,
		handleMobileMenuClose,
		anchorEl,
		mobileMoreAnchorEl,
	} = useContext(NavbarContext);

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
