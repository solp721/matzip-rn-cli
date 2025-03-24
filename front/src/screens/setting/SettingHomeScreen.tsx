import SettingItem from '@/components/setting/SettingItem';
import { colors, settingNavigations } from '@/constants';
import { useAuth } from '@/hooks/queries/useAuth';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';
import OctIcons from 'react-native-vector-icons/Octicons';

const OctIcon = OctIcons as unknown as React.ComponentType<IconProps>;

type SettingHomeScreenProps = StackScreenProps<SettingStackParamList>;

export default function SettingHomeScreen({
	navigation,
}: SettingHomeScreenProps) {
	const { logoutMutation } = useAuth();

	const handlePressEditProfile = () => {
		navigation.navigate(settingNavigations.EDIT_PROFILE);
	};

	const handlePressLogout = () => {
		logoutMutation.mutate(null);
		console.log(logoutMutation);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.space} />
				<SettingItem title="프로필 수정" onPress={handlePressEditProfile} />
				<SettingItem title="마커 카테고리 설정" />
				<View style={styles.space} />
				<SettingItem
					title="로그아웃"
					color={colors.RED_500}
					icon={<OctIcon name="sign-out" size={16} color={colors.RED_500} />}
					onPress={handlePressLogout}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	space: {
		height: 30,
	},
});
