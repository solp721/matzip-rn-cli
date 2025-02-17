import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/root/RootNavigator';

export default function App(): React.JSX.Element {
	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	);
}
