export const paths = {
	home: {
		path: '/',
		getHref: () => '/',
	},
	auth: {
		register: {
			path: '/auth/register',
			getHref: () => '/auth/register',
		},

		login: {
			path: '/auth/login',
			getHref: (redirect: string) => `/auth/login${redirect}`,
		},
	},
	user: {
		profile: {
			path: 'profile',
		},
	},
	protected: {
		account: {
			path: 'settings',
			getHref: () => 'settings',
		},
	},
};
