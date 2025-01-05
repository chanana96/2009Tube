import { LoginForm } from '@/features/auth/components/LoginForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paths } from '@/config/paths';

const Login = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');
	const onSuccess = () => {
		navigate(`${redirectTo ? `${redirectTo}` : paths.home.path}`, {
			replace: true,
		});
	};

	return (
		<>
			<LoginForm onSuccess={onSuccess} />
		</>
	);
};
export default Login;
