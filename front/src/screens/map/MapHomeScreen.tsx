import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, View, Alert } from 'react-native';
import MapView, {
	PROVIDER_GOOGLE,
	Marker,
	LongPressEvent,
	LatLng,
	Callout,
} from 'react-native-maps';
import { alerts, colors, mapNavigations } from '@/constants';
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
import CustomMarker from '@/components/CustomMarker';

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
	const mapRef = useRef<MapView | null>(null);
	const [selectLocation, setSelectLocation] = useState<LatLng | null>();

	usePermission('LOCATION');

	const handlePressUserLocation = () => {
		if (isUserLocationError) {
			return;
		}
		mapRef.current?.animateToRegion({
			latitude: userLocation.latitude,
			longitude: userLocation.longitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		});
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
			>
				<CustomMarker
					coordinate={{
						latitude: 35.14525467924572,
						longitude: 129.00755713706002,
					}}
					color="RED"
					score={5}
				/>
				<CustomMarker
					coordinate={{
						latitude: 35.13525467924572,
						longitude: 129.00755713706002,
					}}
					color="BLUE"
					score={3}
				/>
				{selectLocation && (
					<Callout>
						<Marker coordinate={selectLocation} />
					</Callout>
				)}
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
