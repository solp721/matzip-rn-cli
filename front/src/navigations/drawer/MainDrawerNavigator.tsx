import { createDrawerNavigator } from '@react-navigation/drawer';
import FeedHomeScreen from '@/screens/map/FeedHomeScreen';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';
import MapStackNavigator from '@/navigations/stack/MapStackNavigator';
import { mainDrawerNavigations } from '@/constants';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';

export type MainDrawerParamList = {
	[mainDrawerNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
	[mainDrawerNavigations.FEED]: undefined;
	[mainDrawerNavigations.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export default function MainDrawerNavigator() {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerShown: false,
				drawerType: 'front',
			}}
		>
			<Drawer.Screen
				name={mainDrawerNavigations.HOME}
				component={MapStackNavigator}
				options={{
					title: '홈',
				}}
			/>
			<Drawer.Screen
				name={mainDrawerNavigations.FEED}
				component={FeedHomeScreen}
				options={{
					title: '피드',
				}}
			/>
			<Drawer.Screen
				name={mainDrawerNavigations.CALENDAR}
				component={CalendarHomeScreen}
				options={{
					title: '캘린더',
				}}
			/>
		</Drawer.Navigator>
	);
}
