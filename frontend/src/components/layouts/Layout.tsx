import { Navbar } from './Navbar';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/theme_context';
import { Outlet } from 'react-router-dom';
import { useUser } from '@/lib/auth';

export const Layout = () => {
	const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
	const { data: user } = useUser();

	return (
		<>
			<Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} user={user} />
			<main>
				<Outlet />
			</main>
		</>
	);
};
