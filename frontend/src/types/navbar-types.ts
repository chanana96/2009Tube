import { NavigateFunction } from 'react-router-dom';

export type NavbarMenusProps = {
	anchorEl: HTMLElement | null;
	mobileMoreAnchorEl: HTMLElement | null;
	handleMenuClose: () => void;
	handleLogout: () => void;
	handleMobileMenuClose: () => void;
	handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
	isMenuOpen: boolean;
	isMobileMenuOpen: boolean;
	user?: string;
	navigate: NavigateFunction;
};

export type NavbarProps = {
	toggleTheme: () => void;
	isDarkTheme: boolean;
};

export type AuthMenuProps = {
	menuId: string;
	mobileMenuId: string;
	handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
	handleMobileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
	avatar: string;
	handleOpen: () => void;
	handleClose: () => void;
	open: boolean;
};
