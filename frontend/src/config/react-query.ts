import { DefaultOptions } from '@tanstack/react-query';

export const queryConfig = {
	queries: {
		retry: false,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5,
	},
} satisfies DefaultOptions;

export type QueryConfigType<T extends (...args: any[]) => any> = Omit<
	ReturnType<T>,
	'queryKey' | 'queryFn'
>;
