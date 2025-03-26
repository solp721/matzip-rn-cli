import { useMutation, useQuery, MutationFunction } from '@tanstack/react-query';
import {
	getAccessToken,
	getProfile,
	postLogin,
	logout,
	postSignup,
	kakaoLogin,
	ResponseToken,
	appleLogin,
	editProfile,
	deleteAccount,
	editCategory,
	ResponseProfile,
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
import { Category, Profile } from '@/types/domain';

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

function useAppleLogin(mutationOptions?: UseMutationCustomOptions) {
	return useLogin(appleLogin, mutationOptions);
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

type ResponseSelectProfile = {
	categories: Category;
} & Profile;

const transformProfileCategory = (
	data: ResponseProfile,
): ResponseSelectProfile => {
	const { BLUE, GREEN, RED, YELLOW, PURPLE, ...rest } = data;
	const categories = { RED, YELLOW, GREEN, BLUE, PURPLE };

	return { categories, ...rest };
};

function useGetProfile(
	queryOptions?: UseQueryCustomOptions<ResponseProfile, ResponseSelectProfile>,
) {
	return useQuery({
		queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
		queryFn: getProfile,
		select: transformProfileCategory,
		...queryOptions,
	});
}

function useMutateCategory(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: editCategory,
		onSuccess: newProfile => {
			queryClient.setQueryData(
				[queryKeys.AUTH, queryKeys.GET_PROFILE],
				newProfile,
			);
		},
		...mutationOptions,
	});
}

function useUpdateProfile(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: editProfile,
		onSuccess: newProfile => {
			queryClient.setQueryData(
				[queryKeys.AUTH, queryKeys.GET_PROFILE],
				newProfile,
			);
			queryClient.invalidateQueries({ queryKey: ['auth', 'getProfile'] });
		},
		...mutationOptions,
	});
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			removeHeader('Authorization');
			removeEncryptedStorage(stroageKeys.REFRESH_TOKEN);
			queryClient.resetQueries({ queryKey: [queryKeys.AUTH] });
		},
		...mutationOptions,
	});
}

function useMutateDeleteAccount(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: deleteAccount,
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
	const appleLoginMutation = useAppleLogin();
	const profileMutation = useUpdateProfile();
	const deleteAccountMutation = useMutateDeleteAccount({
		onSuccess: () => logoutMutation.mutate(null),
	});
	const categoryMutation = useMutateCategory();

	return {
		signupMutation,
		refreshTokenQuery,
		isLogin,
		getProfileQuery,
		loginMutation,
		kakaoLoginMutation,
		logoutMutation,
		appleLoginMutation,
		profileMutation,
		deleteAccountMutation,
		categoryMutation,
	};
}

export { useAuth };
