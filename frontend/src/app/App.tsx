import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/theme_context';
import PrimarySearchAppBar from '../components/layouts/navbar_layout';
import { NavbarProvider } from '@/lib/navbarProvider';

function App() {
	const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
	return (
		<>
			<NavbarProvider>
				<PrimarySearchAppBar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
				<div id='main'>
					<Outlet />
				</div>
			</NavbarProvider>
		</>
	);
}

export default App;
