import React from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	Image,
	Dimensions,
	Pressable,
	Text,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import CustomButton from '@/components/common/CustomButton';
import { authNavigations } from '@/constants/navigations';
import { IconProps } from 'react-native-vector-icons/Icon';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';

const IonIcon = IonIcons as unknown as React.ComponentType<IconProps>;
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
					label="카카오 로그인하기"
					onPress={() => navigation.navigate(authNavigations.KAKAO)}
					style={styles.kakaoButtonContainer}
					textStyle={styles.kakaoButtonText}
					icon={
						<IonIcon name={'chatbubble-sharp'} size={16} color={'#181500'} />
					}
				/>
				<CustomButton
					label="이메일 로그인하기"
					onPress={() => navigation.navigate(authNavigations.LOGIN)}
				/>
				<Pressable onPress={() => navigation.navigate(authNavigations.SIGNUP)}>
					<Text style={styles.emailText}>이메일로 가입하기</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginVertical: 30,
		marginHorizontal: 30,
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
		alignItems: 'center',
		gap: 10,
	},
	kakaoButtonContainer: {
		backgroundColor: '#fEE503',
	},
	kakaoButtonText: {
		color: '#181600',
	},
	emailText: {
		textDecorationLine: 'underline',
		fontWeight: '500',
		padding: 10,
		color: colors.BLACK,
	},
});
