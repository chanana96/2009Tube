import { Navigate, useLocation } from 'react-router-dom';
import { paths } from '@/config';
import { useUser } from '@/hooks/useAuth';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const user = useUser();
	const location = useLocation();
	if (!user.data) {
		return <Navigate to={paths.auth.login.getHref(location.pathname)} replace />;
	}

	return children;
};
