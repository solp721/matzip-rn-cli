import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function LoginScreen() {
	return (
		<View style={styles.container}>
			<Text>LoginScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
