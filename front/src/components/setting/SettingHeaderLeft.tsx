import React from 'react';
import HeaderButton from '@/components/common/HeaderButton';
import { colors } from '@/constants';
import { IconProps } from 'react-native-vector-icons/Icon';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';

const IonIcon = IonIcons as unknown as React.ComponentType<IconProps>;

type SettingHeaderLeftProps = {
	navigation: CompositeNavigationProp<
		StackNavigationProp<SettingStackParamList>,
		DrawerNavigationProp<MainDrawerParamList>
	>;
};

export default function SettingHeaderLeft({
	navigation,
}: SettingHeaderLeftProps) {
	return (
		<HeaderButton
			icon={
				<IonIcon
					name="menu"
					size={24}
					color={colors.BLACK}
					onPress={() => navigation.openDrawer()}
				/>
			}
		/>
	);
}
