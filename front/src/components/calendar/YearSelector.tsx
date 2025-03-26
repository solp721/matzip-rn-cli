import { colors, numbers } from '@/constants';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconProps } from 'react-native-vector-icons/Icon';
import React, { useEffect, useState } from 'react';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

const MaterialIcon = MaterialIcons as unknown as React.ComponentType<IconProps>;

interface YearSelectorProps {
	isVisible: boolean;
	currentYear: number;
	onChangeYear: (year: number) => void;
	hide: () => void;
}

export default function YearSelector({
	isVisible,
	currentYear,
	onChangeYear,
	hide,
}: YearSelectorProps) {
	const { theme } = useThemeStorage();
	const styles = styling(theme);
	const [scroolY, setScroolY] = useState(0);

	useEffect(() => {
		const yearIndex = currentYear - numbers.MIN_CALENDAR_YEAR;
		const currentRow = Math.floor(
			yearIndex / numbers.CALENDAR_YEAR_SELECTOR_COLUMN,
		);

		const scrollToY = currentRow * 50;
		setScroolY(scrollToY);
	}, [isVisible, currentYear]);

	return (
		<>
			{isVisible && (
				<View style={styles.container}>
					<View style={styles.yearsContainer}>
						<FlatList
							style={styles.scrollContainer}
							showsVerticalScrollIndicator={false}
							contentOffset={{ x: 0, y: scroolY }}
							initialNumToRender={currentYear - numbers.MIN_CALENDAR_YEAR}
							data={Array.from(
								{
									length:
										numbers.MAX_CALENDAR_YEAR - numbers.MIN_CALENDAR_YEAR + 1,
								},
								(_, index) => ({
									id: index,
									num: index + numbers.MIN_CALENDAR_YEAR,
								}),
							)}
							renderItem={({ item }) => (
								<Pressable
									style={[
										styles.yearButton,
										currentYear === item.num && styles.currentYearButton,
									]}
									key={item.id}
									onPress={() => onChangeYear(item.num)}
								>
									<Text
										style={[
											styles.yearText,
											currentYear === item.num && styles.currentYearText,
										]}
									>
										{item.num}
									</Text>
								</Pressable>
							)}
							keyExtractor={item => String(item.num)}
							numColumns={numbers.CALENDAR_YEAR_SELECTOR_COLUMN}
						/>
					</View>
					<Pressable style={styles.closeButton} onPress={hide}>
						<Text style={styles.closeText}>닫기</Text>
						<MaterialIcon name="close" size={20} color={colors[theme].BLACK} />
					</Pressable>
				</View>
			)}
		</>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			position: 'absolute',
			width: '100%',
		},
		yearsContainer: {
			alignItems: 'center',
			backgroundColor: colors[theme].WHITE,
		},
		scrollContainer: {
			maxHeight: 200,
			backgroundColor: colors[theme].WHITE,
		},
		yearButton: {
			width: 80,
			height: 40,
			padding: 10,
			margin: 5,
			borderWidth: 1,
			borderColor: colors[theme].GRAY_500,
			borderRadius: 2,
			alignItems: 'center',
			justifyContent: 'center',
		},
		yearText: {
			fontSize: 16,
			fontWeight: '500',
			color: colors[theme].GRAY_700,
		},
		currentYearButton: {
			backgroundColor: colors[theme].PINK_700,
			borderColor: colors[theme].PINK_700,
		},
		currentYearText: {
			color: colors[theme].WHITE,
			fontWeight: '600',
		},
		closeButton: {
			flex: 1,
			flexDirection: 'row',
			backgroundColor: colors[theme].WHITE,
			padding: 15,
			alignItems: 'center',
			justifyContent: 'center',
			borderTopWidth: 1,
			borderBottomWidth: 1,
			borderColor: colors[theme].GRAY_500,
		},
		closeText: {
			fontSize: 16,
			fontWeight: '600',
			color: colors[theme].BLACK,
		},
	});
