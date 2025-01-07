import { Navbar } from './Navbar';
import { memo } from 'react';

import { Outlet } from 'react-router-dom';
import { useUser } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/theme_context';

export const Layout = memo(() => {
	const { isDarkTheme, toggleTheme } = useTheme();
	const { data: user, isLoading } = useUser();
	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} user={user} />
			<main>
				<Outlet />
			</main>
		</>
	);
});
