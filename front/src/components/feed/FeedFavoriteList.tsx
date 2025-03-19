import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FeedItem from '@/components/feed/FeedItem';
import useGetInfiniteFavoritePosts from '@/hooks/queries/useGetInfiniteFavoritePosts';
import { colors } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { feedNavigations, feedTabNavigations } from '@/constants';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedTabParamList } from '@/navigations/tab/FeedTabNavigator';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';

type FeedNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<FeedTabParamList>,
	StackNavigationProp<FeedStackParamList>
>;

export default function FeedFavoriteList() {
	const navigation = useNavigation<FeedNavigationProp>();

	const {
		data: posts,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
	} = useGetInfiniteFavoritePosts();

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

	const handleNavigateToDetail = (postId: number) => {
		navigation.navigate(feedTabNavigations.FEED_HOME, {
			screen: feedNavigations.FEED_DETAIL,
			params: { id: postId },
			initial: false,
		});
	};

	return (
		<FlatList
			data={posts?.pages.flat()}
			renderItem={({ item }) => (
				<FeedItem post={item} onPress={() => handleNavigateToDetail(item.id)} />
			)}
			keyExtractor={item => String(item.id)}
			numColumns={2}
			ListEmptyComponent={
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>즐겨찾기한 장소가 없습니다.</Text>
				</View>
			}
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
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyText: {
		fontSize: 16,
		textAlign: 'center',
		color: colors.GRAY_500,
	},
});
