import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { paths } from '../config/paths.ts';
import App from './App.tsx';
import { NotFound } from './routes/NotFound.tsx';
import { ProtectedRoutes } from '@/lib/auth.tsx';
import { WatchVideo } from '@/app/routes/app/watch_video.tsx';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, Suspense, lazy } from 'react';
import type { QueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/layouts/Layout';

const AccountSettings = lazy(() => import('./routes/app/account_settings'));
const Search = lazy(() => import('./routes/app/search'));

const accountRoutes = [
	{
		path: paths.protected.account.path,
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<AccountSettings />
			</Suspense>
		),
	},
];

const createAppRouter = (queryClient: QueryClient) =>
	createBrowserRouter([
		{
			element: (
				<Layout>
					<Outlet />
				</Layout>
			),
			errorElement: <NotFound />,
			hydrateFallbackElement: <Suspense />,
			children: [
				{
					index: true,
					lazy: async () => {
						const { Index } = await import('./routes/Index');
						return { Component: Index };
					},
				},
				{
					path: paths.auth.register.path,
					lazy: async () => {
						const { Register } = await import('../features/auth/routes/Register.tsx');
						return { Component: Register };
					},
				},
				{
					path: paths.auth.login.path,
					lazy: async () => {
						const { Login } = await import('../features/auth/routes/Login.tsx');
						return { Component: Login };
					},
				},
				{
					path: paths.user.profile.path,
					lazy: async () => {
						const { UserProfile } = await import('./routes/user/UserProfile');
						return { Component: UserProfile };
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
