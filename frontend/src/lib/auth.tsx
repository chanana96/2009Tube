import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/user_context';
import { paths } from '@/config/paths';
import { Provider } from './provider';
import { useNavigate } from 'react-router-dom';
import type { AuthContext } from '@/types/auth_context_types';

export const ProtectedRoutes = () => {
	const context = useContext(UserContext);

	const isAuth = context?.isAuth;
	console.log(isAuth);
	return isAuth ? <Outlet /> : <Navigate to={paths.auth.login.path} />;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<AuthContext['user']>(null);
	const [isAuth, setIsAuth] = useState<AuthContext['isAuth']>(false);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const isUser = async () => {
			try {
				const response = await axios.get('/api/auth/me', {
					withCredentials: true,
				});

				setUser(response.data.user);
				setIsAuth(true);
				setIsLoading(false);
			} catch (err) {
				setUser(null);
				setIsAuth(false);
				return err;
			}
		};

		isUser();
	}, []);

	const logout = async () => {
		try {
			await axios.post('/api/auth/logout', {
				withCredentials: true,
			});

			setUser(null);
			setIsAuth(false);
		} catch (err) {
			return err;
		}
	};
	const contextValue: AuthContext = {
		user,
		isAuth,
		logout,
		isLoading,
	};
	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
