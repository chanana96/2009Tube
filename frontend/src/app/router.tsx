import { createBrowserRouter } from 'react-router-dom';
import { paths } from '../config/paths.ts';
import App from './App.tsx';
import Index from './routes/index.tsx';
import { NotFoundRoute } from './routes/not_found.tsx';
import { ProtectedRoutes } from '@/lib/auth.tsx';
import { WatchVideo } from '@/app/routes/app/watch_video.tsx';
import { lazy } from 'react';
import { Suspense } from 'react';

const Register = lazy(() => import('./routes/auth/register'));
const Login = lazy(() => import('./routes/auth/login'));
const UserProfile = lazy(() => import('@/app/routes/app/user_profile'));
const AccountSettings = lazy(() => import('./routes/app/account_settings'));
const Search = lazy(() => import('./routes/app/search'));

const authRoutes = [
	{ path: paths.auth.register.path, element: <Register /> },
	{ path: paths.auth.login.path, element: <Login /> },
];

const userRoutes = [
	{
		path: paths.user.profile.path,
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<UserProfile />
			</Suspense>
		),
	},
];

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

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFoundRoute />,
		children: [
			{ index: true, element: <Index /> },
			...authRoutes,
			{
				path: 'user',
				children: userRoutes,
			},
			{
				path: 'account',
				element: <ProtectedRoutes />,
				children: accountRoutes,
			},
			{
				path: 'watch',
				element: <WatchVideo />,
			},
			{
				path: 'search',
				element: <Search />,
			},
		],
	},
]);
