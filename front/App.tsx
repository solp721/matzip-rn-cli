import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/root/RootNavigator';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './src/api/queryClient';

export default function App(): React.JSX.Element {
	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<RootNavigator />
			</NavigationContainer>
		</QueryClientProvider>
	);
}
