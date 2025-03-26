import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomMarker from '@/components/common/CustomMarker';
import { colors } from '@/constants/colors';
import { MarkerColor } from '@/types/domain';
import { ThemeMode } from '@/types';
import useThemeStorage from '@/hooks/useThemeStorage';

interface MarkerSelectorProps {
	markerColor: MarkerColor;
	onPressMarker: (name: MarkerColor) => void;
	score?: number;
}

const categoryList: MarkerColor[] = [
	'RED',
	'YELLOW',
	'GREEN',
	'BLUE',
	'PURPLE',
];

export default function MarkerSelector({
	markerColor,
	onPressMarker,
	score = 5,
}: MarkerSelectorProps) {
	const { theme } = useThemeStorage();
	const styles = styling(theme);

	return (
		<View style={styles.container}>
			<Text style={styles.markerLabel}>마커 선택</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<View style={styles.markerInputScroll}>
					{categoryList.map(color => (
						<Pressable
							key={color}
							style={[
								styles.markerBox,
								markerColor === color && styles.pressedMarker,
							]}
							onPress={() => onPressMarker(color)}
						>
							<CustomMarker color={color} score={score} />
						</Pressable>
					))}
				</View>
			</ScrollView>
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			borderWidth: 1,
			borderColor: colors[theme].GRAY_200,
			padding: 15,
		},
		markerLabel: {
			marginBottom: 15,
			color: colors[theme].GRAY_700,
		},
		markerInputScroll: {
			flexDirection: 'row',
			gap: 20,
		},
		markerBox: {
			alignItems: 'center',
			justifyContent: 'center',
			width: 50,
			height: 50,
			borderColor: colors[theme].GRAY_100,
			borderRadius: 6,
		},
		pressedMarker: {
			borderWidth: 2,
			borderColor: colors[theme].RED_500,
		},
	});
