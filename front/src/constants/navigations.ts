const authNavigations = {
	AUTH_HOME: 'AuthHome',
	KAKAO: 'Kakao',
	LOGIN: 'Login',
	SIGNUP: 'Signup',
} as const;

const mapNavigations = {
	MAP_HOME: 'MapHome',
	ADD_POST: 'AddPost',
	SEARCH_LOCATION: 'SearchLocation',
} as const;

const mainDrawerNavigations = {
	HOME: 'Home',
	FEED: 'Feed',
	CALENDAR: 'Calendar',
} as const;

const feedNavigations = {
	FEED_HOME: 'FeedHome',
	FEED_DETAIL: 'FeedDetail',
	EDIT_POST: 'EditPost',
	IMAGE_ZOOM: 'ImageZoom',
} as const;

const feedTabNavigations = {
	FEED_HOME: 'FeedTabHome',
	FEED_FAVORITE: 'FeedFavorite',
} as const;

export {
	authNavigations,
	mapNavigations,
	mainDrawerNavigations,
	feedNavigations,
	feedTabNavigations,
};
