import { UseMutationOptions, DefaultOptions } from '@tanstack/react-query';

export const queryConfig = {
	queries: {
		retry: 1,
		retryDelay: 5,
		refetchOnMount: true,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5,
	},
} satisfies DefaultOptions;
