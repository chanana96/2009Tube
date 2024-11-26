import { useState } from 'react';

export const useNavbarHandlers = (logout: () => void) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

	return {
		anchorEl,
		mobileMoreAnchorEl,
		handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) =>
			setAnchorEl(event.currentTarget),
		handleMobileMenuClose: () => setMobileMoreAnchorEl(null),
		handleMenuClose: () => {
			setAnchorEl(null);
			setMobileMoreAnchorEl(null);
		},
		handleLogout: () => {
			setAnchorEl(null);
			setMobileMoreAnchorEl(null);
			logout();
		},
		handleMobileMenuOpen: (event: React.MouseEvent<HTMLElement>) =>
			setMobileMoreAnchorEl(event.currentTarget),
	};
};
