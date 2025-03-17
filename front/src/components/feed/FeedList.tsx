import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import FeedItem from '@/components/feed/FeedItem';

export default function FeedList() {
	const {
		data: posts,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
	} = useGetInfinitePosts();

	const [isRefreshing, setIsRefreshing] = useState(false);

	const handleEndReached = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	const handleRefresh = async () => {
		setIsRefreshing(true);
		await refetch();
		setIsRefreshing(false);
	};

	return (
		<FlatList
			data={posts?.pages.flat()}
			renderItem={({ item }) => <FeedItem post={item} />}
			keyExtractor={item => String(item.id)}
			numColumns={2}
			contentContainerStyle={styles.contentContainer}
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.5}
			refreshing={isRefreshing}
			onRefresh={handleRefresh}
			indicatorStyle="black"
		/>
	);
}
const styles = StyleSheet.create({
	contentContainer: {
		padding: 15,
	},
});
