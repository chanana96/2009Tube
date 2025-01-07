import { ProfileContainer } from '../components/ProfileContainer';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
	const { username } = useParams();
	if (!username) {
		return null;
	}
	return <ProfileContainer username={username} />;
};
export default UserProfile;
