import { useState } from 'react';
import { NavbarContext } from '@/contexts/navbar_context';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/features/auth/api/auth_api';
import { useNavigate } from 'react-router-dom';

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
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
	return (
		<NavbarContext.Provider
			value={{
				mobileMoreAnchorEl,
				setMobileMoreAnchorEl,
				anchorEl,
				setAnchorEl,
				handleProfileClick,
				handleAccountClick,
				handleLogout,
				handleMenuClose,
				handleMobileMenuClose,
			}}>
			{children}
		</NavbarContext.Provider>
	);
};
