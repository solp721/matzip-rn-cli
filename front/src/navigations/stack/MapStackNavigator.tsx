import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import { mapNavigations } from '@/constants';

export type MapStackParamList = {
	[mapNavigations.MAP_HOME]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

export default function MapStackNavigator() {
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
				name={mapNavigations.MAP_HOME}
				component={MapHomeScreen}
				options={{
					headerTitle: '',
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
}
