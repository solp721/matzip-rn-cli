import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/constants';
import { ThemeMode } from '@/types';
import useThemeStorage from '@/hooks/useThemeStorage';

export default function DayOfWeek() {
	const { theme } = useThemeStorage();
	const styles = styling(theme);

	return (
		<View style={styles.container}>
			{['일', '월', '화', '수', '목', '금', '토'].map((dayOfWeek, i) => (
				<View key={i} style={styles.item}>
					<Text
						style={[
							styles.text,
							dayOfWeek === '토' && styles.saturdayText,
							dayOfWeek === '일' && styles.sundayText,
						]}
					>
						{dayOfWeek}
					</Text>
				</View>
			))}
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			marginBottom: 5,
		},
		text: {
			fontSize: 12,
			color: colors[theme].BLACK,
		},
		item: {
			width: Dimensions.get('screen').width / 7,
			alignItems: 'center',
		},
		saturdayText: {
			color: colors[theme].BLUE_500,
		},
		sundayText: {
			color: colors[theme].RED_500,
		},
	});
