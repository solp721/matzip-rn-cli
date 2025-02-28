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
} from 'react-native';
import { colors } from '@/constants';
import { useAuth } from '@/hooks/queries/useAuth';

export default function CustomDrawerContent(
	props: DrawerContentComponentProps,
) {
	const { getProfileQuery, logoutMutation } = useAuth();
	const { email, nickname, imageUri, kakaoImageUri } =
		getProfileQuery.data || {};

	const handleLogout = () => {
		logoutMutation.mutate(null);
	};

	return (
		<SafeAreaView style={styles.container}>
			<DrawerContentScrollView
				{...props}
				scrollEnabled={false}
				contentContainerStyle={styles.contentContainer}
			>
				<View style={styles.userInfoContainer}>
					<View style={styles.userImageContainer}>
						{imageUri === null && kakaoImageUri === null && (
							<Image
								source={require('@/assets/user-default.png')}
								style={styles.userImage}
							/>
						)}
						{imageUri === null && !!kakaoImageUri && (
							<Image source={{ uri: kakaoImageUri }} style={styles.userImage} />
						)}
						{imageUri !== null && (
							<Image source={{ uri: imageUri }} style={styles.userImage} />
						)}
					</View>
					<Text style={styles.nameText}>{nickname ?? email}</Text>
				</View>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>
			<Pressable
				style={{ alignItems: 'flex-end', padding: 10 }}
				onPress={handleLogout}
			>
				<Text>로그아웃</Text>
			</Pressable>
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
});
