import { UseMutationCustomOptions, Marker } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '@/api';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants';

export default function useMutateCreatePost(
	mutationOptions?: UseMutationCustomOptions,
) {
	return useMutation({
		mutationFn: createPost,
		onSuccess: newPost => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [
					queryKeys.POST,
					queryKeys.GET_CALENDAR_POSTS,
					new Date(newPost.date).getFullYear(),
					new Date(newPost.date).getMonth() + 1,
				],
			});
			queryClient.setQueryData<Marker[]>(
				[queryKeys.MARKER, queryKeys.GET_MARKERS],
				existingMarkers => {
					const newMarker = {
						id: newPost.id,
						color: newPost.color,
						score: newPost.score,
						latitude: newPost.latitude,
						longitude: newPost.longitude,
					};
					console.log(existingMarkers);
					return existingMarkers
						? [...existingMarkers, newMarker]
						: [newMarker];
				},
			);
		},
		...mutationOptions,
	});
}
