const authNavigations = {
	AUTH_HOME: 'AuthHome',
	LOGIN: 'Login',
	SIGNUP: 'Signup',
} as const;

const mapNavigations = {
	MAP_HOME: 'MapHome',
} as const;

const mainDrawerNavigations = {
	HOME: 'Home',
	FEED: 'Feed',
	CALENDAR: 'Calendar',
} as const;

export { authNavigations, mapNavigations, mainDrawerNavigations };
