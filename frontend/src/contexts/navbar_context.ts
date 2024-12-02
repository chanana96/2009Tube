import { createContext } from 'react';

export type NavbarContextType = {
	open: boolean;
	handleOpen: () => void;
	handleClose: () => void;
	anchorEl: null | HTMLElement;
	setAnchorEl: (anchorEl: null | HTMLElement) => void;
	mobileMoreAnchorEl: null | HTMLElement;
	setMobileMoreAnchorEl: (mobileMoreAnchorEl: null | HTMLElement) => void;
	handleProfileClick: () => void;
	handleAccountClick: () => void;
	handleLogout: () => void;
	handleMenuClose: () => void;
	handleMobileMenuClose: () => void;
};

export const NavbarContext = createContext<NavbarContextType | null>(null);
