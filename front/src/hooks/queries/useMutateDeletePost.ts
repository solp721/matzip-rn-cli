import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { deletePost } from '@/api';
import queryClient from '@/api/queryClient';
import { UseMutationCustomOptions } from '@/types';
// import { Marker, UseMutationCustomOptions } from '@/types';

export default function useMutateDeletePost(
	mutationOptions?: UseMutationCustomOptions,
) {
	return useMutation({
		mutationFn: deletePost,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
			});
			queryClient.invalidateQueries({
				queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS],
			});
			// queryClient.setQueryData<Marker[]>(
			// 	[queryKeys.MARKER, queryKeys.GET_MARKERS],
			// 	existingMarkers => {
			// 		return existingMarkers.filter(marker => marker.id !== deleteId);
			// 	},
			// );
		},
		...mutationOptions,
	});
}
