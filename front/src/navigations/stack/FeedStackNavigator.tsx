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

export type FeedStackParamList = {
	[feedNavigations.FEED_HOME]: undefined;
	[feedNavigations.FEED_DETAIL]: {
		id: number;
	};
	[feedNavigations.EDIT_POST]: {
		location: LatLng;
	};
};

export type FeedStackNavigationProp = CompositeNavigationProp<
	StackNavigationProp<FeedStackParamList>,
	DrawerNavigationProp<MainDrawerParamList>
>;

const Stack = createStackNavigator<FeedStackParamList>();

export default function FeedStackNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyle: {
					backgroundColor: 'white',
				},
				headerStyle: {
					backgroundColor: 'white',
					shadowColor: 'gray',
				},
				headerTitleStyle: {
					fontSize: 15,
				},
				headerTintColor: 'black',
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
						backgroundColor: colors.GRAY_100,
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
		</Stack.Navigator>
	);
}
