export const paths = {
	home: {
		path: '/',
		getHref: () => '/',
	},
	auth: {
		register: {
			path: '/auth/register',
			getHref: (redirectTo?: string | null | undefined) =>
				`/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
		},

		login: {
			path: '/auth/login',
			getHref: (redirectTo?: string | null | undefined) =>
				`/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
		},
	},
	user: {
		profile: {
			path: '/user/profile/:username',
			getHref: () => '/',
		},
	},
	watch: {
		path: '/watch',
		getHref: () => '/',
	},
	search: {
		path: '/search',
		getHref: () => '/',
	},
	account: {
		settings: {
			path: '/account/settings',
			getHref: () => '/account',
		},
	},
	upload: {
		path: '/upload',
		getHref: () => '/',
	},
} as const;
