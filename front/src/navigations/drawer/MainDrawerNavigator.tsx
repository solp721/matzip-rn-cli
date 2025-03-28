import { createDrawerNavigator } from '@react-navigation/drawer';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import MapStackNavigator from '@/navigations/stack/MapStackNavigator';
import { colors, mainDrawerNavigations } from '@/constants';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RouteProp } from '@react-navigation/native';
import { IconProps } from 'react-native-vector-icons/Icon';
import { Dimensions } from 'react-native';
import CustomDrawerContent from './CustomDrawerContent';
import FeedTabNavigator, { FeedTabParamList } from '../tab/FeedTabNavigator';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import SettingStackNavigator from '@/navigations/stack/SettingStackNavigator';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

const MaterialIcon = MaterialIcons as unknown as React.ComponentType<IconProps>;

export type MainDrawerParamList = {
	[mainDrawerNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
	[mainDrawerNavigations.FEED]: NavigatorScreenParams<FeedTabParamList>;
	[mainDrawerNavigations.CALENDAR]: undefined;
	[mainDrawerNavigations.SETTING]: NavigatorScreenParams<SettingStackParamList>;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function DrawerIcons(
	route: RouteProp<MainDrawerParamList>,
	focused: boolean,
	theme: ThemeMode,
) {
	let iconName = '';

	switch (route.name) {
		case mainDrawerNavigations.HOME: {
			iconName = 'location-on';
			break;
		}
		case mainDrawerNavigations.FEED: {
			iconName = 'book';
			break;
		}
		case mainDrawerNavigations.CALENDAR: {
			iconName = 'event';
			break;
		}
		case mainDrawerNavigations.SETTING: {
			iconName = 'settings';
			break;
		}
	}

	return (
		<MaterialIcon
			name={iconName}
			size={18}
			color={focused ? colors[theme].BLACK : colors[theme].GRAY_500}
		/>
	);
}

export default function MainDrawerNavigator() {
	const { theme } = useThemeStorage();

	return (
		<Drawer.Navigator
			drawerContent={CustomDrawerContent}
			screenOptions={({ route }) => ({
				headerShown: false,
				drawerType: 'front',
				drawerStyle: {
					width: Dimensions.get('screen').width * 0.6,
					backgroundColor: colors[theme].WHITE,
				},
				drawerActiveTintColor: colors[theme].BLACK,
				drawerInactiveTintColor: colors[theme].GRAY_500,
				drawerActiveBackgroundColor: colors[theme].PINK_200,
				drawerInactiveBackgroundColor: colors[theme].GRAY_100,
				drawerLabelStyle: {
					fontWeight: '600',
				},
				drawerIcon: ({ focused }) => DrawerIcons(route, focused, theme),
			})}
		>
			<Drawer.Screen
				name={mainDrawerNavigations.HOME}
				component={MapStackNavigator}
				options={{
					title: '홈',
					swipeEnabled: false,
				}}
			/>
			<Drawer.Screen
				name={mainDrawerNavigations.FEED}
				component={FeedTabNavigator}
				options={{
					title: '피드',
				}}
			/>
			<Drawer.Screen
				name={mainDrawerNavigations.CALENDAR}
				component={CalendarHomeScreen}
				options={{
					title: '캘린더',
					headerShown: true,
					headerLeft: () => <FeedHomeHeaderLeft />,
				}}
			/>
			<Drawer.Screen
				name={mainDrawerNavigations.SETTING}
				component={SettingStackNavigator}
				options={{
					title: '설정',
					headerShown: false,
					drawerItemStyle: {
						height: 0,
					},
				}}
			/>
		</Drawer.Navigator>
	);
}
