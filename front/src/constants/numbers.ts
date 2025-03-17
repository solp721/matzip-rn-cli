const numbers = {
	ACCESS_TOKEN_REFRESH_TIME: 1000 * 60 * 30 - 1000 * 60 * 3,
	INITIA_DELTA: {
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	},
} as const;

export { numbers };
