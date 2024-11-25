import { QueryClient, QueryClientProvider, usePrefetchQuery } from '@tanstack/react-query';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../app/theme';
import { ThemeContext } from '../contexts/theme_context';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

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
	const userSession = sessionStorage.getItem('user');

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: 1,
				retryDelay: 5,
				refetchOnMount: false,
				refetchOnWindowFocus: false,
			},
		},
	});

	queryClient.fetchQuery({
		queryKey: ['authState'],
		queryFn: async () => {
			const response = await axios.get('/api/auth/me', {
				withCredentials: true,
			});
			if (!userSession) {
				sessionStorage.setItem('user', response.data.userdata);
			}
			return response;
		},
	});

	return (
		<React.Suspense fallback={<CircularProgress />}>
			<ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
				<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
					<CssBaseline />

					<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
				</ThemeProvider>
			</ThemeContext.Provider>
		</React.Suspense>
	);
};
