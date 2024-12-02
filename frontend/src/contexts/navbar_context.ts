import { createContext, useContext } from 'react';

export type NavbarContextType = {
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

export const useNavbarContext = (): NavbarContextType => {
	const context = useContext(NavbarContext);
	if (!context) {
		throw new Error('useNavbarContext must be used within a NavbarProvider');
	}
	return context;
};
