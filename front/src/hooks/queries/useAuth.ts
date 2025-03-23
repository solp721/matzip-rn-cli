import { useMutation, useQuery, MutationFunction } from '@tanstack/react-query';
import {
	getAccessToken,
	getProfile,
	postLogin,
	logout,
	postSignup,
	kakaoLogin,
	ResponseToken,
} from '@/api/auth';
import {
	UseMutationCustomOptions,
	UseQueryCustomOptions,
} from '@/types/common';
import {
	removeEncryptedStorage,
	removeHeader,
	setEncryptedStorage,
	setHeader,
} from '@/utils';
import { useEffect } from 'react';
import queryClient from '@/api/queryClient';
import { queryKeys, stroageKeys, numbers } from '@/constants';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: postSignup,
		...mutationOptions,
	});
}

function useLogin<T>(
	loginAPI: MutationFunction<ResponseToken, T>,
	mutationOptions?: UseMutationCustomOptions,
) {
	return useMutation({
		mutationFn: loginAPI,
		onSuccess: ({ accessToken, refreshToken }) => {
			setEncryptedStorage(stroageKeys.REFRESH_TOKEN, refreshToken);
			setHeader('Authorization', `Bearer ${accessToken}`);
		},
		onSettled: () => {
			queryClient.refetchQueries({
				queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
			});
			queryClient.invalidateQueries({
				queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
			});
		},
		...mutationOptions,
	});
}

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
	return useLogin(postLogin, mutationOptions);
}

function useKakaoLogin(mutationOptions?: UseMutationCustomOptions) {
	return useLogin(kakaoLogin, mutationOptions);
}

function useGetRefreshToken() {
	const { isSuccess, data, isError } = useQuery({
		queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
		queryFn: getAccessToken,
		staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
		refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
		refetchOnReconnect: true,
		refetchIntervalInBackground: true,
	});

	useEffect(() => {
		if (isSuccess) {
			setHeader('Authorization', `Bearer ${data.accessToken}`);
			setEncryptedStorage(stroageKeys.REFRESH_TOKEN, data.refreshToken);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError) {
			removeHeader('Authorization');
			removeEncryptedStorage(stroageKeys.REFRESH_TOKEN);
		}
	}, [isError]);

	return { isSuccess, isError };
}

function useGetProfile(queryOptions?: UseQueryCustomOptions) {
	return useQuery({
		queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
		queryFn: getProfile,
		...queryOptions,
	});
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			removeHeader('Authorization');
			removeEncryptedStorage(stroageKeys.REFRESH_TOKEN);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.AUTH] });
		},
		...mutationOptions,
	});
}

function useAuth() {
	const signupMutation = useSignup();
	const refreshTokenQuery = useGetRefreshToken();
	const getProfileQuery = useGetProfile({
		enabled: refreshTokenQuery.isSuccess,
	});
	const isLogin = getProfileQuery.isSuccess;
	const loginMutation = useEmailLogin();
	const kakaoLoginMutation = useKakaoLogin();
	const logoutMutation = useLogout();

	return {
		signupMutation,
		refreshTokenQuery,
		isLogin,
		getProfileQuery,
		loginMutation,
		kakaoLoginMutation,
		logoutMutation,
	};
}

export { useAuth };
