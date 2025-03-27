import {
	InfiniteData,
	UseInfiniteQueryOptions,
	useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { getFavoritePosts, ResponsePost } from '@/api/post';
import { queryKeys } from '@/constants';
import { ResponseError } from '@/types';

type FavoritePostQueryKey = readonly [
	typeof queryKeys.POST,
	typeof queryKeys.FAVORITE,
	typeof queryKeys.GET_FAVORITE_POSTS,
];

type FavoritePostQueryResult = ResponsePost[];
type FavoritePostQueryError = ResponseError;
type FavoritePostInfiniteData = InfiniteData<FavoritePostQueryResult, number>;
type PageParam = number;

export default function useGetInfiniteFavoritePosts(
	queryOptions?: Omit<
		UseInfiniteQueryOptions<
			FavoritePostQueryResult,
			FavoritePostQueryError,
			FavoritePostInfiniteData,
			FavoritePostQueryResult,
			FavoritePostQueryKey,
			PageParam
		>,
		'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
	>,
) {
	const QUERY_KEY: FavoritePostQueryKey = [
		queryKeys.POST,
		queryKeys.FAVORITE,
		queryKeys.GET_FAVORITE_POSTS,
	] as const;

	const INITIAL_PAGE = 1;

	return useSuspenseInfiniteQuery<
		FavoritePostQueryResult,
		FavoritePostQueryError,
		FavoritePostInfiniteData,
		FavoritePostQueryKey,
		PageParam
	>({
		queryKey: QUERY_KEY,
		queryFn: ({ pageParam }) => getFavoritePosts(pageParam),
		initialPageParam: INITIAL_PAGE,
		getNextPageParam: (lastPage, allPages) => {
			const lastPost = lastPage[lastPage.length - 1];
			return lastPost ? allPages.length + 1 : undefined;
		},
		...queryOptions,
	});
}
