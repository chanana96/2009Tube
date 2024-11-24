import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					'color': '#FEFFFF',
					'&:hover': {
						backgroundColor: 'transparent',
					},
				},
			},
		},
	},

	palette: {
		mode: 'light',
	},
});

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});
