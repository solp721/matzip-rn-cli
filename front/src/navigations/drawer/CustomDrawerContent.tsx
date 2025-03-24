import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import {
	View,
	StyleSheet,
	Text,
	Image,
	SafeAreaView,
	Pressable,
	Platform,
	ActivityIndicator,
} from 'react-native';
import { colors, mainDrawerNavigations, settingNavigations } from '@/constants';
import { useAuth } from '@/hooks/queries/useAuth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconProps } from 'react-native-vector-icons/Icon';

const MaterialIcon = MaterialIcons as unknown as React.ComponentType<IconProps>;

interface ProfileData {
	email?: string;
	nickname?: string;
	imageUri?: string | null;
	kakaoImageUri?: string | null;
}

export default function CustomDrawerContent(
	props: DrawerContentComponentProps,
) {
	const { getProfileQuery } = useAuth();
	const { email, nickname, imageUri, kakaoImageUri } =
		(getProfileQuery.data as ProfileData) || {};

	const handlePressSettings = () => {
		props.navigation.navigate(mainDrawerNavigations.SETTING, {
			screen: settingNavigations.SETTING_HOME,
		});
	};

	if (getProfileQuery.isError || getProfileQuery.isPending) {
		return <ActivityIndicator />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<DrawerContentScrollView
				{...props}
				scrollEnabled={false}
				contentContainerStyle={styles.contentContainer}
			>
				<View style={styles.userInfoContainer}>
					<Pressable style={styles.userImageContainer}>
						{imageUri === null && kakaoImageUri === null && (
							<Image
								source={require('@/assets/user-default.png')}
								style={styles.userImage}
							/>
						)}
						{imageUri === null && !!kakaoImageUri && (
							<Image
								source={{
									uri: `${
										Platform.OS === 'ios'
											? 'http://localhost:3030/'
											: 'http://10.0.2.2:3030/'
									}${kakaoImageUri}`,
								}}
								style={styles.userImage}
							/>
						)}
						{imageUri !== null && (
							<Image
								source={{
									uri: `${
										Platform.OS === 'ios'
											? 'http://localhost:3030/'
											: 'http://10.0.2.2:3030/'
									}${imageUri}`,
								}}
								style={styles.userImage}
							/>
						)}
					</Pressable>
					<Text style={styles.nameText}>{nickname ?? email}</Text>
				</View>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>
			<View style={styles.bottomContainer}>
				<Pressable style={styles.bottomMenu} onPress={handlePressSettings}>
					<MaterialIcon name={'settings'} size={18} color={colors.GRAY_700} />
					<Text style={styles.bottomMenuText}>설정</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		backgroundColor: colors.WHITE,
	},
	nameText: {
		color: colors.BLACK,
		fontSize: 16,
		fontWeight: 'bold',
	},
	userInfoContainer: {
		alignItems: 'center',
		marginTop: 15,
		marginBottom: 30,
		marginHorizontal: 15,
	},
	userImage: {
		width: '100%',
		height: '100%',
		borderRadius: 35,
	},
	userImageContainer: {
		width: 70,
		height: 70,
		borderRadius: 35,
		marginBottom: 10,
	},
	bottomContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		paddingVertical: 25,
		borderTopWidth: 1,
		borderTopColor: colors.GRAY_200,
	},
	bottomMenu: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	bottomMenuText: {
		fontSize: 15,
		fontWeight: '600',
		color: colors.GRAY_700,
	},
});
