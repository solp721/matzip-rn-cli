import React from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	Image,
	Dimensions,
	Pressable,
	Text,
	Platform,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import CustomButton from '@/components/common/CustomButton';
import { authNavigations } from '@/constants/navigations';
import { IconProps } from 'react-native-vector-icons/Icon';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import appleAuth, {
	AppleButton,
} from '@invertase/react-native-apple-authentication';
import { useAuth } from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';

const IonIcon = IonIcons as unknown as React.ComponentType<IconProps>;

type AuthHomeScreenProps = StackScreenProps<
	AuthStackParamList,
	typeof authNavigations.AUTH_HOME
>;

export default function AuthHomeScreen({ navigation }: AuthHomeScreenProps) {
	const { appleLoginMutation } = useAuth();

	const handlePressAppleLogin = async () => {
		try {
			const { identityToken, fullName } = await appleAuth.performRequest({
				requestedOperation: appleAuth.Operation.LOGIN,
				requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
			});

			if (identityToken) {
				appleLoginMutation.mutate({
					identityToken,
					appId: 'org.reactjs.native.example.matzip',
					nickname: fullName?.givenName || null,
				});
			}
		} catch (error: unknown) {
			if (
				error instanceof Error &&
				'code' in error &&
				error.code !== appleAuth.Error.CANCELED
			) {
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: '개발자가 그지라서 ㅠㅠ',
					text2: '애플 로그인 연동할 돈이 없어요 ㅠㅠ',
				});
			}
		}
	};

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
				{Platform.OS === 'ios' && (
					<AppleButton
						buttonStyle={AppleButton.Style.BLACK}
						buttonType={AppleButton.Type.SIGN_IN}
						style={styles.appleButton}
						cornerRadius={3}
						onPress={handlePressAppleLogin}
					/>
				)}
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
	appleButton: {
		width: Dimensions.get('screen').width - 60,
		height: 45,
	},
});
