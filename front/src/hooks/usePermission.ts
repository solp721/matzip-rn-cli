import { useEffect } from 'react';
import {
	check,
	PERMISSIONS,
	request,
	RESULTS,
	Permission,
} from 'react-native-permissions';
import { Alert, Linking, Platform } from 'react-native';
import { alerts } from '@/constants';

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissionOs = {
	[key in PermissionType]: Permission;
};

const androidPermission: PermissionOs = {
	LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
	PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermission: PermissionOs = {
	LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
	PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

export default function usePermission(type: PermissionType) {
	useEffect(() => {
		(async () => {
			const isAndroid = Platform.OS === 'android';
			const permissionOS = isAndroid ? androidPermission : iosPermission;
			const checked = await check(permissionOS[type]);

			const showPermissionAlert = () => {
				Alert.alert(
					alerts[`${type}_PERMISSION`].TITLE,
					alerts[`${type}_PERMISSION`].DESCRIPTION,
					[
						{
							text: '설정하기',
							onPress: () => Linking.openSettings(),
						},
						{
							text: '취소',
							style: 'cancel',
						},
					],
				);
			};

			switch (checked) {
				case RESULTS.DENIED:
					if (isAndroid) {
						showPermissionAlert();
						return;
					}
					await request(permissionOS[type]);
					break;
				case RESULTS.BLOCKED:
				case RESULTS.LIMITED:
					showPermissionAlert();
					break;
				default:
					break;
			}
		})();
	}, []);
}
