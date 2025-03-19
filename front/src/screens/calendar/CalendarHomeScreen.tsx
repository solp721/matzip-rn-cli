import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '@/constants';
import Calendar from '@/components/calendar/Calendar';
import { getMonthYearDetails, getNewMonthYear } from '@/utils/date';

export default function CalendarHomeScreen() {
	const currentMonthYear = getMonthYearDetails(new Date());
	const [monthYear, setMonthYear] = useState(currentMonthYear);

	const handleUpdateMonth = (increment: number) => {
		setMonthYear(prev => getNewMonthYear(prev, increment));
	};

	return (
		<SafeAreaView style={styles.container}>
			<Calendar monthYear={monthYear} onChangeMonth={handleUpdateMonth} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.WHITE,
	},
});
