import Stack from '@mui/material/Stack';
import { VideosList } from '@/features/videos/components/VideosList';

const Index = () => {
	return (
		<Stack direction='row' spacing={2} alignItems='center'>
			<VideosList />
		</Stack>
	);
};
export default Index;
