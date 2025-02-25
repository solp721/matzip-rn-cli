import React from 'react';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import MainDrawerNavigator from '@/navigations/drawer/MainDrawerNavigator';
import { useAuth } from '@/hooks/queries/useAuth';

export default function RootNavigator() {
	const { isLogin } = useAuth();

	return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}
