// import { useState } from 'react';

// export const useNavbarHandlers = (logout: () => void) => {
// 	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// 	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
// 	const [open, setOpen] = useState(false);

// 	return {
// 		anchorEl,
// 		mobileMoreAnchorEl,
// 		open,
// 		handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) =>
// 			setAnchorEl(event.currentTarget),
// 		handleMobileMenuClose: () => setMobileMoreAnchorEl(null),
// 		handleMenuClose: () => {
// 			setAnchorEl(null);
// 			setMobileMoreAnchorEl(null);
// 		},
// 		handleOpen: () => setOpen(true),
// 		handleClose: () => setOpen(false),
// 		handleLogout: () => {
// 			setAnchorEl(null);
// 			setMobileMoreAnchorEl(null);
// 			logout();
// 		},
// 		handleMobileMenuOpen: (event: React.MouseEvent<HTMLElement>) =>
// 			setMobileMoreAnchorEl(event.currentTarget),
// 	};
// };
