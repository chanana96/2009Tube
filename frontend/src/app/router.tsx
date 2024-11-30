import { createBrowserRouter } from 'react-router-dom';
import { paths } from '../config/paths.ts';
import App from './App.tsx';
import Index from './routes/index.tsx';
import { Register } from './routes/auth/register.tsx';
import { NotFoundRoute } from './routes/not_found.tsx';
import { Login } from './routes/auth/login.tsx';
import { ProtectedRoutes } from '@/lib/auth.tsx';
import { AccountSettings } from './routes/app/account_settings';
import { UserProfile } from '@/app/routes/app/user_profile.tsx';
import { WatchVideo } from '@/app/routes/app/watch_video.tsx';

const authRoutes = [
	{ path: paths.auth.register.path, element: <Register /> },
	{ path: paths.auth.login.path, element: <Login /> },
];

const userRoutes = [{ path: paths.user.profile.path, element: <UserProfile /> }];

const accountRoutes = [
	{ index: true, element: <Index /> },
	{ path: paths.protected.account.path, element: <AccountSettings /> },
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
		],
	},
]);
