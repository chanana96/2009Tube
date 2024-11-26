import { QueryClient, QueryClientProvider, usePrefetchQuery } from '@tanstack/react-query';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../config/theme';
import { ThemeContext } from '../contexts/theme_context';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@/hooks/useTheme';

export const Provider = ({ children }: { children: React.ReactNode }) => {
	const { isDarkTheme, toggleTheme } = useTheme();
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
