import { QueryClient, QueryClientProvider, usePrefetchQuery } from '@tanstack/react-query';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../config/theme';
import { ThemeContext } from '../contexts/theme_context';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@/hooks/useTheme';
import { useAuthSession } from '@/hooks/useAuthSession';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			retryDelay: 5,
			refetchOnMount: true,
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 5,
		},
	},
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
	const { isDarkTheme, toggleTheme } = useTheme();

	const { userSession, avatar, user_uuid } = useAuthSession();

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

	if (!avatar || !user_uuid) {
		queryClient.fetchQuery({
			queryKey: ['profile', userSession],
			queryFn: async () => {
				const response = await axios.get(`/api/query/profile/${userSession}`);

				sessionStorage.setItem('avatar', response.data.profile_image);
				sessionStorage.setItem('user_uuid', response.data.user_uuid);
				return response;
			},
		});
	}

	return (
		<React.Suspense fallback={<CircularProgress />}>
			<ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
				<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
					<QueryClientProvider client={queryClient}>
						<CssBaseline />
						{children}
					</QueryClientProvider>
				</ThemeProvider>
			</ThemeContext.Provider>
		</React.Suspense>
	);
};
