import React, { useState } from 'react';
import { ImageUri, ThemeMode } from '@/types';
import {
	View,
	Image,
	StyleSheet,
	Dimensions,
	Platform,
	Pressable,
	NativeSyntheticEvent,
	NativeScrollEvent,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { colors } from '@/constants/colors';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { IconProps } from 'react-native-vector-icons/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import useThemeStorage from '@/hooks/useThemeStorage';

const IonIcon = IonIcons as unknown as React.ComponentType<IconProps>;

interface ImageCarouselProps {
	images: ImageUri[];
	pressedIndex?: number;
}

const deviceWidth = Dimensions.get('window').width;

export default function ImageCarousel({
	images,
	pressedIndex = 0,
}: ImageCarouselProps) {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const [page, setPage] = useState(pressedIndex);
	const [initialIndex, setInitialIndex] = useState(pressedIndex);
	const { theme } = useThemeStorage();
	const styles = styling(theme);

	const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const newPage = Math.round(e.nativeEvent.contentOffset.x / deviceWidth);
		setPage(newPage);
	};

	return (
		<View style={styles.container}>
			<Pressable
				style={[styles.backButton, { marginTop: insets.top + 10 }]}
				onPress={() => {
					navigation.goBack();
				}}
			>
				<IonIcon name="arrow-back" size={30} color={colors[theme].WHITE} />
			</Pressable>
			<FlatList
				data={images}
				renderItem={({ item }) => (
					<View style={{ width: deviceWidth }}>
						<Image
							style={styles.image}
							source={{
								uri: `${
									Platform.OS === 'ios'
										? 'http://localhost:3030/'
										: `http://10.0.2.2:3030/`
								}${item.uri}`,
							}}
							resizeMode="contain"
						/>
					</View>
				)}
				keyExtractor={item => String(item.id)}
				onScroll={handleScroll}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				initialScrollIndex={initialIndex}
				onScrollToIndexFailed={() => {
					setInitialIndex(0);
				}}
				getItemLayout={(_, index) => ({
					length: deviceWidth,
					offset: deviceWidth * index,
					index,
				})}
			/>
			<View style={[styles.pageDotContainer, { bottom: insets.bottom + 10 }]}>
				{Array.from({ length: images.length }, (_, index) => {
					return (
						<View
							key={index}
							style={[styles.pageDot, index === page && styles.currentPageDot]}
						/>
					);
				})}
			</View>
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			backgroundColor: colors[theme].WHITE,
		},
		image: {
			width: '100%',
			height: '100%',
		},
		backButton: {
			position: 'absolute',
			left: 20,
			zIndex: 1,
			backgroundColor: colors[theme].PINK_700,
			height: 40,
			width: 40,
			borderRadius: 40,
			justifyContent: 'center',
			alignItems: 'center',
		},
		pageDotContainer: {
			position: 'absolute',
			flexDirection: 'row',
			alignItems: 'center',
		},
		pageDot: {
			margin: 4,
			backgroundColor: colors[theme].GRAY_200,
			width: 8,
			height: 8,
			borderRadius: 4,
		},
		currentPageDot: {
			backgroundColor: colors[theme].PINK_700,
		},
	});
