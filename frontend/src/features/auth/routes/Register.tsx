import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paths } from '@/config/paths';
import type { UseFormSetError } from 'react-hook-form';

const Register = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');
	const onSuccess = () => {
		navigate(`${redirectTo ? `${redirectTo}` : paths.home.path}`, {
			replace: true,
		});
	};
	const onError =
		<T,>(setError: UseFormSetError<T>) =>
		(errorMessage: string) => {
			setError('root', {
				type: 'custom',
				message: errorMessage,
			});
		};
	return (
		<>
			<RegisterForm onSuccess={onSuccess} onError={onError} />
		</>
	);
};

export default Register;
