import CustomButton from '@/components/common/CustomButton';
import { colors, errorMessages } from '@/constants';
import { useAuth } from '@/hooks/queries/useAuth';
import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { alerts } from '@/constants';
import Toast from 'react-native-toast-message';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

export default function DeleteAccountScreen() {
	const { theme } = useThemeStorage();
	const { deleteAccountMutation } = useAuth();
	const styles = styling(theme);

	const handlePressDeleteAccount = () => {
		Alert.alert(
			alerts.DELETE_ACCOUNT.TITLE,
			alerts.DELETE_ACCOUNT.DESCRIPTION,
			[
				{
					text: '탈퇴',
					onPress: () =>
						deleteAccountMutation.mutate(null, {
							onSuccess: () => {
								Toast.show({
									type: 'success',
									text1: '회원탈퇴가 완료되었습니다.',
									position: 'bottom',
								});
							},
							onError: error => {
								Toast.show({
									type: 'error',
									text1:
										error.response?.data.message ||
										errorMessages.UNEXPECTED_ERROR,
									position: 'bottom',
								});
							},
						}),
					style: 'destructive',
				},
				{
					text: '취소',
					style: 'cancel',
				},
			],
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<Text style={styles.infoText}>
					저장된 데이터를 모두 삭제해야 회원탈퇴가 가능해요.
				</Text>
				<Text style={styles.infoText}>
					저장된 장소가 남아있다면 삭제해주세요.
				</Text>
				<Text style={styles.infoText}>
					회원탈퇴 후 데이터는 복구할 수 없어요.
				</Text>
			</View>

			<CustomButton label="회원탈퇴" onPress={handlePressDeleteAccount} />
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: 20,
			marginBottom: 20,
		},
		infoContainer: {
			alignItems: 'center',
			marginTop: 10,
			marginBottom: 30,
			borderWidth: 1,
			borderColor: colors[theme].PINK_700,
			borderRadius: 3,
			padding: 10,
			gap: 10,
		},
		infoText: {
			color: colors[theme].PINK_700,
			fontSize: 15,
			fontWeight: '600',
		},
	});
