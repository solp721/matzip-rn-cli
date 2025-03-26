import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors, feedNavigations } from '@/constants';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import { LatLng } from 'react-native-maps';
import EditPostScreen from '@/screens/feed/EditPostScreen';
import ImageZoomScreen from '@/screens/feed/ImageZoomScreen';
import useThemeStorage from '@/hooks/useThemeStorage';

export type FeedStackParamList = {
	[feedNavigations.FEED_HOME]: undefined;
	[feedNavigations.FEED_DETAIL]: {
		id: number;
		previousTab?: string;
	};
	[feedNavigations.EDIT_POST]: {
		location: LatLng;
	};
	[feedNavigations.IMAGE_ZOOM]: {
		index: number;
	};
};

export type FeedStackNavigationProp = CompositeNavigationProp<
	StackNavigationProp<FeedStackParamList>,
	DrawerNavigationProp<MainDrawerParamList>
>;

const Stack = createStackNavigator<FeedStackParamList>();

export default function FeedStackNavigator() {
	const { theme } = useThemeStorage();

	return (
		<Stack.Navigator
			screenOptions={{
				cardStyle: {
					backgroundColor: colors[theme].WHITE,
				},
				headerStyle: {
					backgroundColor: colors[theme].WHITE,
					shadowColor: colors[theme].GRAY_200,
				},
				headerTitleStyle: {
					fontSize: 15,
				},
				headerTintColor: colors[theme].BLACK,
			}}
		>
			<Stack.Screen
				name={feedNavigations.FEED_HOME}
				component={FeedHomeScreen}
				options={() => ({
					headerTitle: '피드',
					headerLeft: () => <FeedHomeHeaderLeft />,
				})}
			/>
			<Stack.Screen
				name={feedNavigations.FEED_DETAIL}
				component={FeedDetailScreen}
				options={() => ({
					headerShown: false,
					headerTitle: '',
					cardStyle: {
						backgroundColor: colors[theme].GRAY_100,
					},
				})}
			/>
			<Stack.Screen
				name={feedNavigations.EDIT_POST}
				component={EditPostScreen}
				options={() => ({
					headerTitle: '장소 수정',
				})}
			/>
			<Stack.Screen
				name={feedNavigations.IMAGE_ZOOM}
				component={ImageZoomScreen}
				options={() => ({
					headerShown: false,
					headerTitle: '',
				})}
			/>
		</Stack.Navigator>
	);
}
