import { ResponsePost, getSearchPosts } from '@/api';
import { queryKeys } from '@/constants';
import { ResponseError } from '@/types';
import {
	InfiniteData,
	UseInfiniteQueryOptions,
	useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

type SearchPostQueryKey = readonly [
	typeof queryKeys.POST,
	typeof queryKeys.GET_SEARCH_POSTS,
	string,
];

export default function useGetInfiniteSearchPosts(
	query: string,
	queryOptions?: Omit<
		UseInfiniteQueryOptions<
			ResponsePost[],
			ResponseError,
			InfiniteData<ResponsePost[], number>,
			ResponsePost[],
			SearchPostQueryKey,
			number
		>,
		'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
	>,
) {
	return useSuspenseInfiniteQuery<
		ResponsePost[],
		ResponseError,
		InfiniteData<ResponsePost[], number>,
		SearchPostQueryKey,
		number
	>({
		queryKey: [queryKeys.POST, queryKeys.GET_SEARCH_POSTS, query] as const,
		queryFn: ({ pageParam }) => getSearchPosts(pageParam, query),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const lastPost = lastPage[lastPage.length - 1];
			return lastPost ? allPages.length + 1 : undefined;
		},
		...queryOptions,
	});
}
