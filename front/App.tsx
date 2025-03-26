import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/root/RootNavigator';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import Toast, {
	BaseToast,
	ErrorToast,
	BaseToastProps,
} from 'react-native-toast-message';
import { colors } from '@/constants';
import useThemeStorage from '@/hooks/useThemeStorage';
import { StatusBar } from 'react-native';

const toastConfig = {
	success: (props: BaseToastProps) => (
		<BaseToast
			{...props}
			style={{ borderLeftColor: colors['light'].BLUE_500 }}
			text1Style={{
				fontSize: 14,
			}}
			text2Style={{
				fontSize: 12,
			}}
		/>
	),
	error: (props: BaseToastProps) => (
		<ErrorToast
			{...props}
			style={{
				borderLeftColor: colors['light'].RED_500,
			}}
			text1Style={{
				fontSize: 14,
			}}
			text2Style={{
				fontSize: 12,
			}}
		/>
	),
};

export default function App(): React.JSX.Element {
	const { theme } = useThemeStorage();
	return (
		<QueryClientProvider client={queryClient}>
			<StatusBar
				barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
			/>
			<NavigationContainer>
				<RootNavigator />
				<Toast config={toastConfig} />
			</NavigationContainer>
		</QueryClientProvider>
	);
}
