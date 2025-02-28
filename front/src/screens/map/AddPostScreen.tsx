import { StackScreenProps } from '@react-navigation/stack';
import { View, StyleSheet, Text } from 'react-native';
import { mapNavigations } from '@/constants';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';

type AddPostScreenProps = StackScreenProps<
	MapStackParamList,
	typeof mapNavigations.ADD_POST
>;

export default function AddPostScreen({ route }: AddPostScreenProps) {
	const { location } = route.params;

	return (
		<View style={styles.container}>
			<Text>{location.latitude}</Text>
			<Text>{location.longitude}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
