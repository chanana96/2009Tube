import Stack from '@mui/material/Stack';

import LatestUploads from '@/features/videos/components/LatestUploads';

export default function Index() {
	return (
		<>
			<Stack direction='row' spacing={2} alignItems='center'>
				<LatestUploads />
			</Stack>
		</>
	);
}
