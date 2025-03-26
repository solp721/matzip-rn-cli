import { colors } from '@/constants';
import { useAuth } from '@/hooks/queries/useAuth';
import axios from 'axios';
import { useState } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	Platform,
	View,
	ActivityIndicator,
	Dimensions,
} from 'react-native';
import Config from 'react-native-config';
import WebView, {
	WebViewMessageEvent,
	WebViewNavigation,
} from 'react-native-webview';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

const REDIRECT_URI = `${
	Platform.OS === 'ios' ? 'http://localhost:3030/' : 'http://10.0.2.2:3030/'
}auth/oauth/kakao`;

export default function KakaoLoginScreen() {
	const { theme } = useThemeStorage();
	const styles = styling(theme);
	const { kakaoLoginMutation } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [isChangeNavigate, setIsChangeNavigate] = useState(true);

	const handleOnMessage = (event: WebViewMessageEvent) => {
		if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
			const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');
			requestToken(code);
		}
	};

	const requestToken = async (code: string) => {
		const response = await axios({
			method: 'POST',
			url: 'https://kauth.kakao.com/oauth/token',
			params: {
				grant_type: 'authorization_code',
				client_id: Config.KAKAO_REST_API_KEY,
				redirect_uri: REDIRECT_URI,
				code,
			},
		});
		kakaoLoginMutation.mutate(response.data.access_token);
	};

	const handleNavigationChangeState = (event: WebViewNavigation) => {
		const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
		setIsLoading(isMatched);
		setIsChangeNavigate(event.loading);
	};

	return (
		<SafeAreaView style={styles.container}>
			{(isLoading || isChangeNavigate) && (
				<View style={styles.kakaoLoginLoadingContainer}>
					<ActivityIndicator size="large" color={colors[theme].BLACK} />
				</View>
			)}
			<WebView
				source={{
					uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
				}}
				onMessage={handleOnMessage}
				injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
				onNavigationStateChange={handleNavigationChangeState}
			/>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		kakaoLoginLoadingContainer: {
			backgroundColor: colors[theme].WHITE,
			height: Dimensions.get('screen').height,
			paddingBottom: 100,
			alignItems: 'center',
			justifyContent: 'center',
		},
	});
