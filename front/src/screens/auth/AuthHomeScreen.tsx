import React from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	Image,
	Dimensions,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import CustomButton from '@/components/common/CustomButton';
import { authNavigations } from '@/constants/navigations';

type AuthHomeScreenProps = StackScreenProps<
	AuthStackParamList,
	typeof authNavigations.AUTH_HOME
>;

export default function AuthHomeScreen({ navigation }: AuthHomeScreenProps) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					resizeMode="contain"
					source={require('@/assets/matzip.png')}
					style={styles.image}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<CustomButton
					label="로그인하기"
					onPress={() => navigation.navigate(authNavigations.LOGIN)}
				/>
				<CustomButton
					label="회원가입하기"
					variant="outlined"
					onPress={() => navigation.navigate(authNavigations.SIGNUP)}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 30,
		alignItems: 'center',
	},
	imageContainer: {
		flex: 1.5,
		width: Dimensions.get('screen').width / 2,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	buttonContainer: {
		flex: 1,
		gap: 10,
	},
});
