import React from 'react';
import HeaderButton from '@/components/common/HeaderButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconProps } from 'react-native-vector-icons/Icon';
import { colors } from '@/constants';
import { FeedStackNavigationProp } from '@/navigations/stack/FeedStackNavigator';
import { useNavigation } from '@react-navigation/native';
import useThemeStorage from '@/hooks/useThemeStorage';

const Ionicon = Ionicons as unknown as React.ComponentType<IconProps>;

export default function FeedHomeHeaderLeft() {
	const navigation = useNavigation<FeedStackNavigationProp>();
	const { theme } = useThemeStorage();
	return (
		<HeaderButton
			icon={<Ionicon name="menu" color={colors[theme].BLACK} size={25} />}
			onPress={() => navigation.openDrawer()}
		/>
	);
}
