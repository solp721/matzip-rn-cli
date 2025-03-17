import React from 'react';
import {
	SafeAreaView,
	View,
	StyleSheet,
	Text,
	Image,
	Dimensions,
	Pressable,
	Platform,
} from 'react-native';
import useGetPost from '@/hooks/queries/useGetPost';
import { Modal } from 'react-native';
import { colors, feedNavigations, mainDrawerNavigations } from '@/constants';
import CustomMarker from '@/components/common/CustomMarker';
import Octicons from 'react-native-vector-icons/Octicons';
import { IconProps } from 'react-native-vector-icons/Icon';
import { getDateWithSeparator } from '@/utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
	CompositeNavigationProp,
	useNavigation,
} from '@react-navigation/native';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';

const IonIcon = Octicons as unknown as React.ComponentType<IconProps>;
const MaterialIcon = MaterialIcons as unknown as React.ComponentType<IconProps>;

interface MarkerModalProps {
	markerId: number | null;
	isVisible: boolean;
	hide: () => void;
}

type Navigation = CompositeNavigationProp<
	DrawerNavigationProp<MainDrawerParamList>,
	StackNavigationProp<FeedStackParamList>
>;

export default function MarkerModal({
	markerId,
	isVisible,
	hide,
}: MarkerModalProps) {
	const { data: post, isPending, isError } = useGetPost(markerId);
	const navigation = useNavigation<Navigation>();

	if (isPending || isError) {
		return <></>;
	}

	const handlePressModal = () => {
		navigation.navigate(mainDrawerNavigations.FEED, {
			screen: feedNavigations.FEED_DETAIL,
			params: {
				id: post.id,
			},
			initial: false,
		});
	};

	return (
		<Modal visible={isVisible} transparent={true} animationType="slide">
			<SafeAreaView style={styles.optionBackground} onTouchEnd={hide}>
				<Pressable style={styles.cardContainer} onPress={handlePressModal}>
					<View style={styles.cardInner}>
						<View style={styles.cardAlign}>
							{post?.images.length > 0 && (
								<View style={styles.imageContainer}>
									<Image
										source={{
											uri: `${
												Platform.OS === 'ios'
													? `http://localhost:3030/${post.images[0].uri}`
													: `http://10.0.2.2:3030/${post.images[0].uri}`
											}`,
										}}
										style={styles.image}
										resizeMode="cover"
									/>
								</View>
							)}
							{post?.images.length === 0 && (
								<View
									style={[styles.imageContainer, styles.emptyImageContainer]}
								>
									<CustomMarker color={post.color} score={post.score} />
								</View>
							)}
							<View style={styles.infoContainer}>
								<View style={styles.addressContainer}>
									<IonIcon name="location" size={10} color={colors.GRAY_500} />
									<Text
										numberOfLines={1}
										ellipsizeMode="tail"
										style={styles.addressText}
									>
										{post?.address}
									</Text>
								</View>
								<Text style={styles.titleText}>{post?.title}</Text>
								<Text style={styles.dateText}>
									{getDateWithSeparator(post?.date, '.')}
								</Text>
							</View>
							<View style={styles.arrowContainer}>
								<MaterialIcon
									name="arrow-forward-ios"
									size={20}
									color={colors.BLACK}
								/>
							</View>
						</View>
					</View>
				</Pressable>
			</SafeAreaView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	optionBackground: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	cardContainer: {
		backgroundColor: colors.WHITE,
		margin: 10,
		borderRadius: 20,
		shadowColor: colors.BLACK,
		shadowOffset: { width: 3, height: 3 },
		shadowOpacity: 0.2,
		elevation: 1,
		borderColor: colors.GRAY_500,
		borderWidth: 1.5,
	},
	cardInner: {
		padding: 20,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	cardAlign: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageContainer: {
		width: 70,
		height: 70,
		borderRadius: 35,
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 35,
	},
	emptyImageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.GRAY_200,
		borderRadius: 35,
		borderWidth: 1,
	},
	infoContainer: {
		width: Dimensions.get('screen').width / 2,
		marginLeft: 15,
		gap: 5,
	},
	addressContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	addressText: {
		fontSize: 10,
		color: colors.GRAY_500,
	},
	titleText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: colors.BLACK,
	},
	dateText: {
		fontSize: 12,
		fontWeight: 'bold',
		color: colors.PINK_700,
	},
	arrowContainer: {
		flex: 1,
		alignItems: 'flex-end',
	},
});
