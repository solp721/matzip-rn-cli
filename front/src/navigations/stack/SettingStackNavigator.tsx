import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors, settingNavigations } from '@/constants';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import SettingHeaderLeft from '@/components/setting/SettingHeaderLeft';
import DeleteAccountScreen from '@/screens/setting/DeleteAccountScreen';
import EditCategoryScreen from '@/screens/setting/EditCategoryScreen';

export type SettingStackParamList = {
	[settingNavigations.SETTING_HOME]: undefined;
	[settingNavigations.EDIT_PROFILE]: undefined;
	[settingNavigations.DELETE_ACCOUNT]: undefined;
	[settingNavigations.EDIT_CATEGORY]: undefined;
};

export type SettingStackNavigationProp = CompositeNavigationProp<
	StackNavigationProp<SettingStackParamList>,
	DrawerNavigationProp<MainDrawerParamList>
>;

const Stack = createStackNavigator<SettingStackParamList>();

export default function SettingStackNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyle: {
					backgroundColor: colors.GRAY_100,
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
				name={settingNavigations.SETTING_HOME}
				component={SettingHomeScreen}
				options={({ navigation }) => ({
					headerTitle: '설정',
					headerLeft: () => (
						<SettingHeaderLeft
							navigation={navigation as SettingStackNavigationProp}
						/>
					),
				})}
			/>
			<Stack.Screen
				name={settingNavigations.EDIT_PROFILE}
				component={EditProfileScreen}
				options={() => ({
					headerTitle: '프로필 수정',
					cardStyle: {
						backgroundColor: colors.WHITE,
					},
				})}
			/>
			<Stack.Screen
				name={settingNavigations.DELETE_ACCOUNT}
				component={DeleteAccountScreen}
				options={() => ({
					headerTitle: '회원탈퇴',
					cardStyle: {
						backgroundColor: colors.WHITE,
					},
				})}
			/>
			<Stack.Screen
				name={settingNavigations.EDIT_CATEGORY}
				component={EditCategoryScreen}
				options={() => ({
					headerTitle: '카테고리 설정',
					cardStyle: {
						backgroundColor: colors.WHITE,
					},
				})}
			/>
		</Stack.Navigator>
	);
}
