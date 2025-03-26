import React from 'react';
import {
	Dimensions,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { RegionInfo } from '@/hooks/useSearchLocation';
import Octicons from 'react-native-vector-icons/Octicons';
import { IconProps } from 'react-native-vector-icons/Icon';
import { colors } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import useLocationStore from '@/store/useLocationStore';
import { LatLng } from 'react-native-maps';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

const IonIcon = Octicons as unknown as React.ComponentType<IconProps>;

interface SearchRegionResultProps {
	regionInfo: RegionInfo[];
}

export default function SearchRegionResult({
	regionInfo,
}: SearchRegionResultProps) {
	const { theme } = useThemeStorage();
	const styles = styling(theme);
	const navigation = useNavigation();
	const { setMoveLocation, setSelectLocation } = useLocationStore();

	const handlePressRegionInfo = (latitude: string, longitude: string) => {
		const regionLocation = {
			latitude: Number(latitude),
			longitude: Number(longitude),
		};

		moveToMapScreen(regionLocation);
	};

	const moveToMapScreen = (regionLocation: LatLng) => {
		navigation.goBack();
		setMoveLocation(regionLocation);
		setSelectLocation(regionLocation);
	};

	return (
		<View style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator
				indicatorStyle="black"
				contentContainerStyle={styles.scrollContainer}
			>
				{regionInfo.map((info, index) => (
					<Pressable
						key={info.id}
						style={[
							styles.itemBorder,
							index === regionInfo.length - 1 && styles.noItemBorder,
						]}
						onPress={() => handlePressRegionInfo(info.y, info.x)}
					>
						<View style={styles.placeNameContainer}>
							<IonIcon
								name="location"
								size={15}
								color={colors[theme].PINK_700}
							/>
							<Text
								style={styles.placeText}
								ellipsizeMode="tail"
								numberOfLines={1}
							>
								{info.place_name}
							</Text>
						</View>
						<View style={styles.categoryContainer}>
							<Text style={styles.distanceText}>
								{(Number(info.distance) / 1000).toFixed(2)}km
							</Text>
							<Text style={styles.subInfoText}>{info.category_name}</Text>
						</View>
						<Text style={styles.subInfoText}>{info.road_address_name}</Text>
					</Pressable>
				))}

				{regionInfo.length === 0 && (
					<View style={styles.noResultContainer}>
						<Text style={styles.noResultText}>검색 결과가 없습니다.</Text>
					</View>
				)}
			</ScrollView>
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			borderWidth: 1,
			borderColor: colors[theme].GRAY_200,
			borderRadius: 5,
			height: Dimensions.get('screen').height / 2,
			marginVertical: 5,
			width: '100%',
		},
		scrollContainer: {
			padding: 10,
		},
		itemBorder: {
			marginHorizontal: 5,
			paddingVertical: 10,
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderBottomColor: colors[theme].GRAY_300,
			gap: 3,
		},
		noItemBorder: {
			borderBottomWidth: 0,
		},
		placeNameContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 5,
		},
		placeText: {
			color: colors[theme].BLACK,
			flexShrink: 1,
			fontSize: 16,
			fontWeight: '600',
		},
		categoryContainer: {
			flexDirection: 'row',
			gap: 10,
		},
		distanceText: {
			color: colors[theme].BLACK,
		},
		subInfoText: {
			flexShrink: 1,
			color: colors[theme].GRAY_500,
		},
		noResultContainer: {
			flex: 1,
			marginTop: 50,
			alignItems: 'center',
		},
		noResultText: {
			fontSize: 16,
			color: colors[theme].GRAY_500,
		},
	});
