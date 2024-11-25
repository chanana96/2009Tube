import { lightTheme, darkTheme } from './theme';
import PrimarySearchAppBar from '../components/layouts/navbar_layout';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, createContext, useContext } from 'react';

import { ThemeContext } from '@/contexts/theme_context';
import { useQuery } from '@tanstack/react-query';

function App() {
	const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

	return (
		<>
			<PrimarySearchAppBar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
			<div id='main'>
				<Outlet />
			</div>
		</>
	);
}

export default App;
