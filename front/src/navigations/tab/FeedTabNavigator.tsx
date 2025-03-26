import { colors, feedNavigations } from '@/constants';
import { feedTabNavigations } from '@/constants';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedStackNavigator from '../stack/FeedStackNavigator';
import { StyleSheet } from 'react-native';
import {
	getFocusedRouteNameFromRoute,
	RouteProp,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconProps } from 'react-native-vector-icons/Icon';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';
import FeedSearchScreen from '@/screens/feed/FeedSearchScreen';

const Ionicon = Ionicons as unknown as React.ComponentType<IconProps>;

export type FeedTabParamList = {
	[feedTabNavigations.FEED_HOME]: {
		screen: typeof feedNavigations.FEED_DETAIL;
		params: {
			id: number;
		};
		initial: false;
	};
	[feedTabNavigations.FEED_FAVORITE]: undefined;
	[feedTabNavigations.FEED_SEARCH]: undefined;
};

const Tab = createBottomTabNavigator<FeedTabParamList>();

function TabBarIcons(
	route: RouteProp<FeedTabParamList>,
	focused: boolean,
	theme: ThemeMode,
) {
	let iconName = '';

	switch (route.name) {
		case feedTabNavigations.FEED_HOME: {
			iconName = focused ? 'reader' : 'reader-outline';
			break;
		}
		case feedTabNavigations.FEED_FAVORITE: {
			iconName = focused ? 'star' : 'star-outline';
			break;
		}
		case feedTabNavigations.FEED_SEARCH: {
			iconName = 'search';
			break;
		}
	}

	return (
		<Ionicon
			name={iconName}
			color={focused ? colors[theme].PINK_700 : colors[theme].GRAY_500}
			size={25}
		/>
	);
}
export default function FeedTabNavigator() {
	const { theme } = useThemeStorage();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerStyle: {
					backgroundColor: colors[theme].WHITE,
					shadowColor: colors[theme].GRAY_200,
				},
				headerTitleStyle: {
					fontSize: 15,
				},
				headerTintColor: colors[theme].BLACK,
				tabBarShowLabel: false,
				tabBarActiveTintColor: colors[theme].PINK_700,
				tabBarStyle: {
					backgroundColor: colors[theme].WHITE,
					borderTopColor: colors[theme].GRAY_200,
					borderTopWidth: StyleSheet.hairlineWidth,
				},
				tabBarIcon: ({ focused }) => TabBarIcons(route, focused, theme),
			})}
		>
			<Tab.Screen
				name={feedTabNavigations.FEED_HOME}
				component={FeedStackNavigator}
				options={({ route }) => ({
					headerShown: false,
					tabBarStyle: (() => {
						const routeName = getFocusedRouteNameFromRoute(route);
						if (
							routeName === feedNavigations.FEED_DETAIL ||
							routeName === feedNavigations.EDIT_POST ||
							routeName === feedNavigations.IMAGE_ZOOM
						) {
							return { display: 'none' as const };
						}

						return {
							backgroundColor: colors[theme].WHITE,
							borderTopColor: colors[theme].GRAY_200,
							borderTopWidth: StyleSheet.hairlineWidth,
						};
					})(),
				})}
			/>
			<Tab.Screen
				name={feedTabNavigations.FEED_FAVORITE}
				component={FeedFavoriteScreen}
				options={() => ({
					headerTitle: '즐겨찾기',
					headerLeft: () => <FeedHomeHeaderLeft />,
				})}
			/>
			<Tab.Screen
				name={feedTabNavigations.FEED_SEARCH}
				component={FeedSearchScreen}
				options={() => ({
					headerTitle: '검색',
					headerShown: false,
					headerLeft: () => <FeedHomeHeaderLeft />,
				})}
			/>
		</Tab.Navigator>
	);
}
