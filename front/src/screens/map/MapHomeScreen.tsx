import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Alert } from 'react-native';
import MapView, {
	PROVIDER_GOOGLE,
	Marker,
	LongPressEvent,
	LatLng,
	// Callout,
} from 'react-native-maps';
import { alerts, colors, mapNavigations, numbers } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconProps } from 'react-native-vector-icons/Icon';
import { mapStyle } from '@/style/mapStyle';
import CustomMarker from '@/components/common/CustomMarker';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import MarkerModal from '@/components/map/MarkerModal';
import useModal from '@/hooks/useModal';
import useMoveMapView from '@/hooks/useMoveMapView';
import Toast from 'react-native-toast-message';

type Navigation = CompositeNavigationProp<
	StackNavigationProp<MapStackParamList>,
	DrawerNavigationProp<MainDrawerParamList>
>;

const IonIcon = Ionicons as unknown as React.ComponentType<IconProps>;
const MaterialIcon = MaterialIcons as unknown as React.ComponentType<IconProps>;

export default function MapHomeScreen() {
	const inset = useSafeAreaInsets();
	const navigation = useNavigation<Navigation>();
	const { userLocation, isUserLocationError } = useUserLocation();
	const [selectLocation, setSelectLocation] = useState<LatLng | null>();
	const [markerId, setMarkerId] = useState<number | null>(null);
	const markerModal = useModal();
	const { data: markers = [] } = useGetMarkers();
	const { mapRef, moveMapView, handleChangeDelta } = useMoveMapView();

	usePermission('LOCATION');

	const handlePressUserLocation = () => {
		if (isUserLocationError) {
			Toast.show({
				type: 'error',
				text1: '위치 권한을 허용해주세요.',
				position: 'bottom',
			});
			return;
		}
		moveMapView(userLocation);
	};

	const handleLongPressMapView = ({ nativeEvent }: LongPressEvent) => {
		setSelectLocation(nativeEvent.coordinate);
	};

	const handlePressAddPost = () => {
		if (!selectLocation) {
			return Alert.alert(
				alerts.NOT_SELECTED_LOCATION.TITLE,
				alerts.NOT_SELECTED_LOCATION.DESCRIPTION,
			);
		}
		navigation.navigate(mapNavigations.ADD_POST, {
			location: selectLocation,
		});
		setSelectLocation(null);
	};

	const handlePressMarker = (id: number, coordinate: LatLng) => {
		moveMapView(coordinate);
		setMarkerId(id);
		markerModal.show();
	};

	return (
		<>
			<MapView
				ref={mapRef}
				style={styles.container}
				provider={PROVIDER_GOOGLE}
				showsUserLocation
				followsUserLocation
				showsMyLocationButton={false}
				customMapStyle={mapStyle}
				onLongPress={handleLongPressMapView}
				onRegionChange={handleChangeDelta}
				region={{
					...userLocation,
					...numbers.INITIA_DELTA,
				}}
			>
				{markers.map(({ id, color, score, ...coordinate }) => (
					<CustomMarker
						key={id}
						coordinate={coordinate}
						color={color}
						score={score}
						onPress={() => handlePressMarker(id, coordinate)}
					/>
				))}
				{selectLocation && <Marker coordinate={selectLocation} />}
			</MapView>

			<Pressable
				style={[styles.drawerButton, { top: inset.top || 20 }]}
				onPress={() => navigation.openDrawer()}
			>
				<IonIcon name="menu" size={25} color={colors.WHITE} />
			</Pressable>
			<View style={styles.buttonList}>
				<Pressable style={styles.mapButton} onPress={handlePressAddPost}>
					<MaterialIcon name="add" size={25} color={colors.WHITE} />
				</Pressable>
				<Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
					<MaterialIcon name="my-location" size={25} color={colors.WHITE} />
				</Pressable>
			</View>
			<MarkerModal
				markerId={markerId}
				isVisible={markerModal.isVisible}
				hide={markerModal.hide}
			/>
		</>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	drawerButton: {
		position: 'absolute',
		left: 0,
		top: 20,
		paddingVertical: 10,
		paddingHorizontal: 12,
		backgroundColor: colors.PINK_700,
		borderTopRightRadius: 50,
		borderBottomRightRadius: 50,
		shadowColor: colors.BLACK,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.5,
		elevation: 4,
	},
	buttonList: {
		position: 'absolute',
		bottom: 30,
		right: 15,
	},
	mapButton: {
		backgroundColor: colors.PINK_700,
		marginVertical: 5,
		height: 48,
		width: 48,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		shadowColor: colors.BLACK,
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.5,
		elevation: 2,
	},
});
