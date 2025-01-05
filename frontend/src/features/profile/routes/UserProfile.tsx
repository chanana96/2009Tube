import { ProfileContainer } from '@/features/profile/components/ProfileContainer';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
	const { username } = useParams();
	return <ProfileContainer username={username as string} />;
};
export default UserProfile;