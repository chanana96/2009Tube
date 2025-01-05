import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { paths } from '@/config/paths.ts';
import { NotFound } from './routes/NotFound';
import { ProtectedRoute } from '@/lib/auth';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, Suspense } from 'react';
import type { QueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/layouts/Layout';

const convert = (queryClient: QueryClient) => (m: any) => {
	const { clientLoader, clientAction, default: Component, ...rest } = m;
	return {
		...rest,
		loader: clientLoader?.(queryClient),
		action: clientAction?.(queryClient),
		Component,
	};
};

const createAppRouter = (queryClient: QueryClient) =>
	createBrowserRouter([
		{
			element: <Layout />,
			errorElement: <NotFound />,
			hydrateFallbackElement: <Suspense />,
			children: [
				{
					index: true,
					lazy: () => import('./routes/Index').then(convert(queryClient)),
				},
				{
					path: paths.auth.register.path,
					lazy: () =>
						import('@/features/auth/routes/Register').then(convert(queryClient)),
				},
				{
					path: paths.auth.login.path,
					lazy: () => import('@/features/auth/routes/Login').then(convert(queryClient)),
				},

				{
					path: paths.user.profile.path,
					lazy: () =>
						import('@/features/profile/routes/UserProfile').then(convert(queryClient)),
				},
				{
					path: paths.watch.path,
					lazy: () =>
						import('@/features/videos/routes/WatchVideo').then(convert(queryClient)),
				},

				{
					path: paths.search.path,
					lazy: () => import('@/app/routes/Search').then(convert(queryClient)),
				},
			],
		},
		{
			element: (
				<ProtectedRoute>
					<Outlet />
				</ProtectedRoute>
			),
			children: [
				{
					path: paths.account.settings.path,
					lazy: async () => {
						const { AccountSettings } = await import(
							'@/features/account/routes/AccountSettings'
						);
						return { Component: AccountSettings };
					},
				},
			],
		},
	]);

export const AppRouter = () => {
	const queryClient = useQueryClient();
	const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
	return <RouterProvider router={router} />;
};
