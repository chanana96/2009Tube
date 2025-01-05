import { SettingsForm } from '../components/SettingsForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paths } from '@/config/paths';

export const AccountSettings = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo');

	const onSuccess = () => {
		navigate(`${redirectTo ? `${redirectTo}` : paths.home.path}`, {
			replace: true,
		});
	};

	return <SettingsForm onSuccess={onSuccess} />;
};
