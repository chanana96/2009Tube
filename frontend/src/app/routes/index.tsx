import Stack from '@mui/material/Stack';

import LatestUploads from '@/features/videos/components/LatestUploads';

const Index = () => {
	return (
		<>
			<Stack direction='row' spacing={2} alignItems='center'>
				<LatestUploads />
			</Stack>
		</>
	);
};
export default Index;
