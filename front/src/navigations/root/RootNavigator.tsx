import React from 'react';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import MainDrawerNavigator from '@/navigations/drawer/MainDrawerNavigator';
import { useAuth } from '@/hooks/queries/useAuth';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
export default function RootNavigator() {
	const { isLogin } = useAuth();

	return (
		<>
			<RetryErrorBoundary>
				{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
			</RetryErrorBoundary>
		</>
	);
}
