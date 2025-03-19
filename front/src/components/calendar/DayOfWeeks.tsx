import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/constants';

export default function DayOfWeek() {
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

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginBottom: 5,
	},
	text: {
		fontSize: 12,
		color: colors.BLACK,
	},
	item: {
		width: Dimensions.get('screen').width / 7,
		alignItems: 'center',
	},
	saturdayText: {
		color: colors.BLUE_500,
	},
	sundayText: {
		color: colors.RED_500,
	},
});
