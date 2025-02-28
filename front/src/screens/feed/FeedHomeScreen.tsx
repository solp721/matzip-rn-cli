import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function FeedHomeScreen() {
	return (
		<View style={styles.container}>
			<Text>FeedHomeScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
