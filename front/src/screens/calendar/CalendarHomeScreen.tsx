import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function CalendarHomeScreen() {
	return (
		<View style={styles.container}>
			<Text>CalendarHomeScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
