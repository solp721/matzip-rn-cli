const queryKeys = {
	AUTH: 'auth',
	GET_ACCESS_TOKEN: 'getAccessToken',
	GET_PROFILE: 'getProfile',
} as const;

const stroageKeys = {
	REFRESH_TOKEN: 'refreshToken',
} as const;

export { queryKeys, stroageKeys };
