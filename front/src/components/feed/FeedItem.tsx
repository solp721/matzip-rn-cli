import { ResponsePost } from '@/api/post';
import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	Platform,
	Text,
	Dimensions,
	Pressable,
} from 'react-native';
import { getDateWithSeparator } from '@/utils';
import { colors, feedNavigations } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { ThemeMode } from '@/types';
import useThemeStorage from '@/hooks/useThemeStorage';

interface FeedItemProps {
	post: ResponsePost;
	onPress?: () => void;
}

type Navigation = StackNavigationProp<FeedStackParamList>;

export default function FeedItem({ post, onPress }: FeedItemProps) {
	const navigation = useNavigation<Navigation>();
	const { theme } = useThemeStorage();
	const styles = styling(theme);

	const handlePressFeed = () => {
		if (onPress) {
			onPress();
		} else {
			navigation.navigate(feedNavigations.FEED_DETAIL, {
				id: post.id,
			});
		}
	};

	return (
		<Pressable style={styles.container} onPress={handlePressFeed}>
			<View>
				{post.images.length > 0 && (
					<View style={styles.imageContainer} key={post.id}>
						<Image
							style={styles.image}
							source={{
								uri: `${
									Platform.OS === 'ios'
										? `http://localhost:3030/`
										: `http://10.0.2.2:3030/`
								}/${post.images[0]?.uri}`,
							}}
							resizeMode="cover"
						/>
					</View>
				)}
				{post.images.length === 0 && (
					<View style={[styles.imageContainer, styles.emptyImageContainer]}>
						<Text style={styles.descriptionText}>No Image</Text>
					</View>
				)}
				<View style={styles.textContainer}>
					<Text style={styles.dateText}>
						{getDateWithSeparator(post.date, '/')}
					</Text>
					<Text style={styles.titleText}>{post.title}</Text>
					<Text style={styles.descriptionText} numberOfLines={1}>
						{post.description}
					</Text>
				</View>
			</View>
		</Pressable>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			margin: 5,
			marginVertical: 12,
		},
		imageContainer: {
			width: Dimensions.get('screen').width / 2 - 25,
			height: Dimensions.get('screen').width / 2 - 25,
		},
		image: {
			width: '100%',
			height: '100%',
			borderRadius: 5,
		},
		emptyImageContainer: {
			justifyContent: 'center',
			alignItems: 'center',
			borderColor: colors[theme].GRAY_500,
			borderRadius: 5,
			borderWidth: 1,
		},
		textContainer: {
			marginTop: 7,
			gap: 2,
		},
		dateText: {
			fontSize: 12,
			fontWeight: '500',
			color: colors[theme].PINK_700,
		},
		titleText: {
			color: colors[theme].BLACK,
			fontSize: 13,
			fontWeight: '600',
		},
		descriptionText: {
			fontSize: 13,
			color: colors[theme].GRAY_500,
		},
	});
