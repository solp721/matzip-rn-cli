import React, { Suspense } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import FeedList from '@/components/feed/FeedList';
import Loader from '@/components/common/Loader';
export default function FeedHomeScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Suspense fallback={<Loader />}>
				<FeedList />
			</Suspense>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
