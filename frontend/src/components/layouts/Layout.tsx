import { Navbar } from './Navbar';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/theme_context';

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
	return (
		<>
			<Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
			<main>{children}</main>
		</>
	);
};
