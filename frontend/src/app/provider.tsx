import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { queryConfig } from '@/lib/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { NotFound } from './routes/NotFound';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '@/config/theme';
import { ThemeContext } from '@/contexts/theme_context';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@/hooks/useTheme';

type AppProviderProps = {
	children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
	const { isDarkTheme, toggleTheme } = useTheme();
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: queryConfig,
			}),
	);
	return (
		<React.Suspense fallback={<CircularProgress />}>
			<ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
				<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
					<ErrorBoundary FallbackComponent={NotFound}>
						<QueryClientProvider client={queryClient}>
							<CssBaseline />
							{children}
						</QueryClientProvider>
					</ErrorBoundary>
				</ThemeProvider>
			</ThemeContext.Provider>
		</React.Suspense>
	);
};
