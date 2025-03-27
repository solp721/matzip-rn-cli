import {
	InfiniteData,
	UseInfiniteQueryOptions,
	useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { getPosts, ResponsePost } from '@/api/post';
import { queryKeys } from '@/constants';
import { ResponseError } from '@/types';

type PostQueryKey = readonly [
	typeof queryKeys.POST,
	typeof queryKeys.GET_POSTS,
];

export default function useGetInfinitePosts(
	queryOptions?: Omit<
		UseInfiniteQueryOptions<
			ResponsePost[],
			ResponseError,
			InfiniteData<ResponsePost[], number>,
			ResponsePost[],
			PostQueryKey,
			number
		>,
		'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
	>,
) {
	return useSuspenseInfiniteQuery<
		ResponsePost[],
		ResponseError,
		InfiniteData<ResponsePost[], number>,
		PostQueryKey,
		number
	>({
		queryKey: [queryKeys.POST, queryKeys.GET_POSTS] as const,
		queryFn: ({ pageParam }) => getPosts(pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const lastPost = lastPage[lastPage.length - 1];
			return lastPost ? allPages.length + 1 : undefined;
		},
		...queryOptions,
	});
}
