import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { queryConfig } from '@/config/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { NotFound } from './routes/NotFound';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '@/config/theme';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider, useTheme } from '@/contexts/theme_context';
import { Notifications } from '@/components/ui/Notifications';

type AppProviderProps = {
	children: React.ReactNode;
};

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
	const { isDarkTheme } = useTheme();
	return (
		<MuiThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>{children}</MuiThemeProvider>
	);
};

export const AppProvider = ({ children }: AppProviderProps) => {
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: queryConfig,
			}),
	);

	return (
		<React.Suspense fallback={<CircularProgress />}>
			<ThemeProvider>
				<ThemeWrapper>
					<ErrorBoundary FallbackComponent={NotFound}>
						<QueryClientProvider client={queryClient}>
							<CssBaseline />
							<Notifications />
							{children}
						</QueryClientProvider>
					</ErrorBoundary>
				</ThemeWrapper>
			</ThemeProvider>
		</React.Suspense>
	);
};
