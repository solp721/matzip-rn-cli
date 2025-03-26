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
	SETTING: 'Setting',
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
	FEED_SEARCH: 'FeedSearch',
} as const;

const settingNavigations = {
	SETTING_HOME: 'SettingHome',
	EDIT_PROFILE: 'EditProfile',
	DELETE_ACCOUNT: 'DeleteAccount',
	EDIT_CATEGORY: 'EditCategory',
} as const;

export {
	authNavigations,
	mapNavigations,
	mainDrawerNavigations,
	feedNavigations,
	feedTabNavigations,
	settingNavigations,
};
