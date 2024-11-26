import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ContrastIcon from '@mui/icons-material/Contrast';
import { logout } from '@/features/auth/api/auth_api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Search, SearchIconWrapper, StyledInputBase } from './Search';
import type { NavbarProps as Props } from '@/types/navbar_types';
import { AuthMenu } from '@/components/layouts/AuthMenu';
import { useNavbarHandlers } from '@/hooks/useNavBarHandlers';
import { NavbarMenus } from '@/components/layouts/NavbarMenus';

export default function PrimarySearchAppBar({ toggleTheme, isDarkTheme }: Props) {
	const username = sessionStorage.getItem('user');
	const { user } = useAuth();
	const {
		anchorEl,
		mobileMoreAnchorEl,
		handleProfileMenuOpen,
		handleMobileMenuClose,
		handleMenuClose,
		handleLogout,
		handleMobileMenuOpen,
	} = useNavbarHandlers(logout);
	const navigate = useNavigate();

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const mobileMenuId = 'primary-search-account-menu-mobile';
	const menuId = 'primary-search-account-menu';

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='fixed'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='open drawer'
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>

					<Typography
						variant='h6'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}>
						LOBSTER
					</Typography>

					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search…'
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<IconButton size='large' onClick={toggleTheme}>
							<ContrastIcon />
						</IconButton>
						{username ?
							<AuthMenu
								menuId={menuId}
								handleProfileMenuOpen={handleProfileMenuOpen}
								mobileMenuId={mobileMenuId}
								handleMobileMenuOpen={handleMobileMenuOpen}
							/>
						:	<div>
								<Link to='/auth/login'>
									<Button size='large' variant='outlined'>
										Login
									</Button>
								</Link>
								<Link to='/auth/register'>
									<Button size='large' variant='outlined'>
										Sign up
									</Button>
								</Link>
							</div>
						}
					</Box>
				</Toolbar>
			</AppBar>
			<NavbarMenus
				anchorEl={anchorEl}
				mobileMoreAnchorEl={mobileMoreAnchorEl}
				handleMenuClose={handleMenuClose}
				handleLogout={handleLogout}
				handleMobileMenuClose={handleMobileMenuClose}
				handleProfileMenuOpen={handleProfileMenuOpen}
				isMenuOpen={isMenuOpen}
				isMobileMenuOpen={isMobileMenuOpen}
				user={user}
				navigate={navigate}
			/>
		</Box>
	);
}
