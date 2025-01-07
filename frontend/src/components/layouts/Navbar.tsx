import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PopoverOrigin } from '@mui/material/Popover';
import { Search, SearchIconWrapper, StyledInputBase } from './Search';
import { AuthMenu } from './AuthMenu';
import { Menu, MenuItem } from '@mui/material';
import { useLogout } from '@/hooks/useAuth';
import { paths } from '@/config';
import { User } from '@/types';

type NavbarProps = {
	toggleTheme: () => void;
	isDarkTheme: boolean;
	user?: User | null;
};
const MENU_POSITION_PROPS: {
	anchorOrigin: PopoverOrigin;
	transformOrigin: PopoverOrigin;
} = {
	anchorOrigin: {
		vertical: 'top' as const,
		horizontal: 'right' as const,
	},
	transformOrigin: {
		vertical: 'top' as const,
		horizontal: 'right' as const,
	},
};

export const Navbar = ({ toggleTheme, isDarkTheme, user }: NavbarProps) => {
	const [search, setSearch] = useState('');
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');
	const onSuccess = () => {
		navigate(`${redirectTo ? `${redirectTo}` : paths.home.path}`, {
			replace: true,
		});
	};
	const { mutate: logout } = useLogout({ onSuccess });
	const handleSearch = () => {
		navigate(`/search?q=${search}`);
		setSearch('');
	};
	const handleProfileClick = () => {
		navigate(`/user/profile/${user?.username}`);
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
		<Box className='flex-grow'>
			<AppBar position='fixed'>
				<Toolbar>
					<Link to='/' style={{ textDecoration: 'none' }}>
						<Typography
							variant='h6'
							noWrap
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: '#ffffff',
								textDecoration: 'none',
							}}>
							2009Tube
						</Typography>
					</Link>
					<Search>
						<SearchIconWrapper>
							<IconButton
								onClick={handleSearch}
								sx={{ color: 'inherit', padding: 0 }}>
								<SearchIcon />
							</IconButton>
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search…'
							inputProps={{ 'aria-label': 'search' }}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleSearch();
								}
							}}
						/>
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<IconButton size='large' onClick={toggleTheme}>
							{isDarkTheme ?
								<LightModeIcon />
							:	<DarkModeIcon />}
						</IconButton>
						{user?.id ?
							<AuthMenu
								setAnchorEl={setAnchorEl}
								setMobileMoreAnchorEl={setMobileMoreAnchorEl}
								profile_image={user.profile_image}
							/>
						:	<div>
								<Link to='/auth/login'>
									<Button size='large' variant='text'>
										Login
									</Button>
								</Link>
								<Link to='/auth/register'>
									<Button size='large' variant='text'>
										Sign up
									</Button>
								</Link>
							</div>
						}
					</Box>
				</Toolbar>
			</AppBar>
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
		</Box>
	);
};
