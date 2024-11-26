import { Outlet, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { paths } from '@/config/paths';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';

export const ProtectedRoutes = () => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) return <CircularProgress />;
	return isAuthenticated ? <Outlet /> : <Navigate to={paths.auth.login.path} />;
};
