import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ContrastIcon from '@mui/icons-material/Contrast';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarMenus } from './NavbarMenus';
import { Search, SearchIconWrapper, StyledInputBase } from './Search';
import { AuthMenu } from './AuthMenu';

type NavbarProps = {
	toggleTheme: () => void;
	isDarkTheme: boolean;
	user: any;
};

export const Navbar = ({ toggleTheme, isDarkTheme, user }: NavbarProps) => {
	const [search, setSearch] = useState('');
	const navigate = useNavigate();
	const username = sessionStorage.getItem('user');

	const handleSearch = () => {
		navigate(`/search?q=${search}`);
		setSearch('');
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
							<ContrastIcon />
						</IconButton>
						{username ?
							<AuthMenu />
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
			<NavbarMenus />
		</Box>
	);
};
