import { colors } from '@/constants';
import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';

interface DateBoxProps {
	date: number;
	selectedDate: number;
	onPressDate: (date: number) => void;
	isToday: boolean;
	hasSchedule: boolean;
}

const deviceWidth = Dimensions.get('window').width;

export default function DateBox({
	date,
	selectedDate,
	onPressDate,
	isToday,
	hasSchedule,
}: DateBoxProps) {
	return (
		<Pressable style={styles.container} onPress={() => onPressDate(date)}>
			{date > 0 && (
				<>
					<View
						style={[
							styles.dateContainer,
							date === selectedDate && styles.selectedContainer,
							date === selectedDate && isToday && styles.selectedTodayContainer,
						]}
					>
						<Text
							style={[
								styles.dateText,
								isToday && styles.todayText,
								date === selectedDate && styles.selectedDateText,
							]}
						>
							{date}
						</Text>
					</View>
					{hasSchedule && <View style={styles.scheduleIndicator}></View>}
				</>
			)}
		</Pressable>
	);
}
const styles = StyleSheet.create({
	container: {
		width: deviceWidth / 7,
		height: deviceWidth / 7,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: colors.GRAY_200,
		alignItems: 'center',
	},
	dateContainer: {
		marginTop: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: 28,
		height: 28,
		borderRadius: 28,
	},
	dateText: {
		fontSize: 17,
		color: colors.BLACK,
	},
	selectedContainer: {
		backgroundColor: colors.BLACK,
	},
	selectedDateText: {
		color: colors.WHITE,
	},
	todayText: {
		color: colors.PINK_700,
		fontWeight: 'bold',
	},
	selectedTodayContainer: {
		backgroundColor: colors.PINK_700,
	},
	scheduleIndicator: {
		marginTop: 2,
		width: 6,
		height: 6,
		borderRadius: 6,
		backgroundColor: colors.GRAY_500,
	},
});
