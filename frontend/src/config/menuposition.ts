import { PopoverOrigin } from '@mui/material';

export const MENU_POSITION_PROPS: {
	anchorOrigin: PopoverOrigin;
	transformOrigin: PopoverOrigin;
} = {
	anchorOrigin: {
		vertical: 'top' as const,
		horizontal: 'right' as const,
	},
	transformOrigin: {
		vertical: 'top' as const,
		horizontal: 'right' as const,
	},
};
