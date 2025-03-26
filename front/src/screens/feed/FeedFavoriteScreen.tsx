import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '@/constants';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

export default function FeedFavoriteScreen() {
	const { theme } = useThemeStorage();
	const styles = styling(theme);

	return (
		<SafeAreaView style={styles.container}>
			<FeedFavoriteList />
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
	});
