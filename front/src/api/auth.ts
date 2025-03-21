import { Profile, Category } from '@/types/domain';
import { getEncryptedStorage } from '@/utils/encryptStorage';
import axiosInstance from '@/api/axios';

type RequestUser = {
	email: string;
	password: string;
};

const postSignup = async ({ email, password }: RequestUser): Promise<void> => {
	const { data } = await axiosInstance.post('/auth/signup', {
		email,
		password,
	});

	return data;
};

type ResponseToken = {
	accessToken: string;
	refreshToken: string;
};

const postLogin = async ({
	email,
	password,
}: RequestUser): Promise<ResponseToken> => {
	const { data } = await axiosInstance.post('/auth/signin', {
		email,
		password,
	});

	return data;
};

type ResponseProfile = Profile & Category;

const getProfile = async (): Promise<ResponseProfile> => {
	const { data } = await axiosInstance.get('/auth/me');

	return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
	const refreshToken = await getEncryptedStorage('refreshToken');

	const { data } = await axiosInstance.get('/auth/refresh', {
		headers: {
			Authorization: `Bearer ${refreshToken}`,
		},
	});

	return data;
};

const logout = async (): Promise<void> => {
	await axiosInstance.post('/auth/logout');
};

export { postSignup, postLogin, getProfile, getAccessToken, logout };
export type { RequestUser, ResponseToken, ResponseProfile };
