import { CalendarPost } from '@/api';
import {
	colors,
	feedNavigations,
	feedTabNavigations,
	mainDrawerNavigations,
} from '@/constants';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { FeedTabParamList } from '@/navigations/tab/FeedTabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeNavigationProp } from '@react-navigation/native';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

interface EventListProps {
	posts: CalendarPost[];
}

type Navigation = CompositeNavigationProp<
	DrawerNavigationProp<MainDrawerParamList>,
	BottomTabNavigationProp<FeedTabParamList>
>;

export default function EventList({ posts }: EventListProps) {
	const { theme } = useThemeStorage();
	const insets = useSafeAreaInsets();
	const navigation = useNavigation<Navigation>();
	const styles = styling(theme);

	const handlePressItem = (id: number) => {
		navigation.navigate(mainDrawerNavigations.FEED, {
			screen: feedTabNavigations.FEED_HOME,
			params: {
				screen: feedNavigations.FEED_DETAIL,
				params: { id },
				initial: false,
			},
		});
	};

	return (
		<ScrollView style={styles.container} scrollIndicatorInsets={{ right: 1 }}>
			<View
				style={[styles.innerContainer, { marginBottom: insets.bottom + 30 }]}
			>
				{posts?.map(post => (
					<Pressable
						key={post.id}
						style={styles.itemContainer}
						onPress={() => handlePressItem(post.id)}
					>
						<View style={styles.itemHeader} />
						<View style={styles.infoContainer}>
							<Text
								style={styles.addressText}
								numberOfLines={1}
								ellipsizeMode="tail"
							>
								{post.address}
							</Text>
							<Text style={styles.titleText}>{post.title}</Text>
						</View>
					</Pressable>
				))}
			</View>
		</ScrollView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors[theme].WHITE,
			padding: 20,
		},
		innerContainer: {
			gap: 20,
		},
		itemContainer: {
			flexDirection: 'row',
		},
		itemHeader: {
			backgroundColor: colors[theme].PINK_700,
			width: 6,
			height: 50,
			marginRight: 8,
			borderRadius: 20,
		},
		infoContainer: {
			justifyContent: 'space-evenly',
		},
		addressText: {
			color: colors[theme].GRAY_500,
			fontSize: 13,
		},
		titleText: {
			color: colors[theme].BLACK,
			fontSize: 16,
			fontWeight: '600',
		},
	});
