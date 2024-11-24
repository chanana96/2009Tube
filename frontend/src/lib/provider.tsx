import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../app/theme';
import { ThemeContext } from '../contexts/theme_context';
import CssBaseline from '@mui/material/CssBaseline';

export const Provider = ({ children }: { children: React.ReactNode }) => {
	const [isDarkTheme, setIsDarkTheme] = React.useState(() => {
		const savedTheme = localStorage.getItem('darkTheme');
		return savedTheme !== null ? JSON.parse(savedTheme) : true;
	});
	const toggleTheme = () => {
		setIsDarkTheme((theme: boolean) => {
			localStorage.setItem('darkTheme', JSON.stringify(!theme));
			return !theme;
		});
	};
	const queryClient = new QueryClient();
	function Loading() {
		return <h2>loadinggggggggggggggggggggggggg</h2>;
	}
	return (
		<React.Suspense fallback={<Loading />}>
			<ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
				<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
					<CssBaseline />

					<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
				</ThemeProvider>
			</ThemeContext.Provider>
		</React.Suspense>
	);
};
