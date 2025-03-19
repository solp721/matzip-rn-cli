import { colors } from '@/constants';
import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconProps } from 'react-native-vector-icons/Icon';
import DayOfWeek from './DayOfWeeks';
import { isSameAsCurrentDate, MonthYear } from '@/utils/date';
import { FlatList } from 'react-native-gesture-handler';
import DateBox from './DateBox';

const Ionicon = Ionicons as unknown as React.ComponentType<IconProps>;
const MaterialIcon = MaterialIcons as unknown as React.ComponentType<IconProps>;

interface CalendarProps<T> {
	monthYear: MonthYear;
	selectedDate: number;
	schedules: Record<number, T>;
	onChangeMonth: (increment: number) => void;
	onPressDate: (date: number) => void;
}

export default function Calendar<T>({
	monthYear,
	onChangeMonth,
	selectedDate,
	onPressDate,
	schedules,
}: CalendarProps<T>) {
	const { month, year, firstDow, lastDate } = monthYear;
	return (
		<>
			<View style={styles.headerContainer}>
				<Pressable
					style={styles.monthButtonContainer}
					onPress={() => onChangeMonth(-1)}
				>
					<Ionicon name="arrow-back" size={25} color={colors.BLACK} />
				</Pressable>
				<Pressable style={styles.monthYearContainer}>
					<Text style={styles.titleText}>{`${year}년 ${month}월`}</Text>
					<MaterialIcon
						name="keyboard-arrow-down"
						size={20}
						color={colors.GRAY_500}
					/>
				</Pressable>
				<Pressable
					style={styles.monthButtonContainer}
					onPress={() => onChangeMonth(1)}
				>
					<Ionicon name="arrow-forward" size={25} color={colors.BLACK} />
				</Pressable>
			</View>
			<DayOfWeek />
			<View style={styles.bodyContainer}>
				<FlatList
					data={Array.from({ length: lastDate + firstDow }, (_, i) => ({
						id: i,
						date: i - firstDow + 1,
					}))}
					renderItem={({ item }) => (
						<DateBox
							date={item.date}
							isToday={isSameAsCurrentDate(year, month, item.date)}
							hasSchedule={Boolean(schedules[item.date])}
							selectedDate={selectedDate}
							onPressDate={onPressDate}
						/>
					)}
					keyExtractor={item => String(item.id)}
					numColumns={7}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginHorizontal: 25,
		marginTop: 16,
	},
	monthButtonContainer: {
		padding: 10,
	},
	monthYearContainer: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	titleText: {
		fontSize: 18,
		fontWeight: '500',
		color: colors.BLACK,
	},
	bodyContainer: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: colors.GRAY_300,
		backgroundColor: colors.GRAY_100,
	},
});
