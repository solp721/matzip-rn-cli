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
import getMapStyle from '@/style/mapStyle';
import CustomMarker from '@/components/common/CustomMarker';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import MarkerModal from '@/components/map/MarkerModal';
import useModal from '@/hooks/useModal';
import useMoveMapView from '@/hooks/useMoveMapView';
import Toast from 'react-native-toast-message';
import useLocationStore from '@/store/useLocationStore';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';
import useLegendStorage from '@/hooks/useLegendStorage';
import MapLegend from '@/components/map/MapLegend';
import MarkerFilterOption from '@/components/map/MarkerFilterOption';
import useMarkerFilter from '@/hooks/useMarkerFilter';

type Navigation = CompositeNavigationProp<
	StackNavigationProp<MapStackParamList>,
	DrawerNavigationProp<MainDrawerParamList>
>;

const IonIcon = Ionicons as unknown as React.ComponentType<IconProps>;
const MaterialIcon = MaterialIcons as unknown as React.ComponentType<IconProps>;

export default function MapHomeScreen() {
	const { theme } = useThemeStorage();
	const styles = styling(theme);
	const inset = useSafeAreaInsets();
	const navigation = useNavigation<Navigation>();
	const { userLocation, isUserLocationError } = useUserLocation();
	const { selectLocation, setSelectLocation } = useLocationStore();
	const [markerId, setMarkerId] = useState<number | null>(null);
	const markerModal = useModal();
	const { mapRef, moveMapView, handleChangeDelta } = useMoveMapView();
	const legend = useLegendStorage();
	const filterOption = useModal();
	const markerFilter = useMarkerFilter();
	const { data: markers = [] } = useGetMarkers({
		select: markerFilter.transformFilteredMarker,
	});

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

	const handlePressSearch = () => {
		navigation.navigate(mapNavigations.SEARCH_LOCATION);
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
				customMapStyle={getMapStyle(theme)}
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
				<IonIcon name="menu" size={25} color={colors[theme].WHITE} />
			</Pressable>
			<View style={styles.buttonList}>
				<Pressable style={styles.mapButton} onPress={handlePressAddPost}>
					<MaterialIcon name="add" size={25} color={colors[theme].WHITE} />
				</Pressable>
				<Pressable style={styles.mapButton} onPress={handlePressSearch}>
					<MaterialIcon name="search" size={25} color={colors[theme].WHITE} />
				</Pressable>
				<Pressable style={styles.mapButton} onPress={filterOption.show}>
					<IonIcon
						name="options-outline"
						size={25}
						color={colors[theme].WHITE}
					/>
				</Pressable>
				<Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
					<MaterialIcon
						name="my-location"
						size={25}
						color={colors[theme].WHITE}
					/>
				</Pressable>
			</View>
			<MarkerModal
				markerId={markerId}
				isVisible={markerModal.isVisible}
				hide={markerModal.hide}
			/>
			<MarkerFilterOption
				isVisible={filterOption.isVisible}
				hideOption={filterOption.hide}
			/>
			{legend.isVisible && <MapLegend />}
		</>
	);
}
const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		drawerButton: {
			position: 'absolute',
			left: 0,
			top: 20,
			paddingVertical: 10,
			paddingHorizontal: 12,
			backgroundColor: colors[theme].PINK_700,
			borderTopRightRadius: 50,
			borderBottomRightRadius: 50,
			shadowColor: colors[theme].UNCHANGE_BLACK,
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
			backgroundColor: colors[theme].PINK_700,
			marginVertical: 5,
			height: 48,
			width: 48,
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: 30,
			shadowColor: colors[theme].UNCHANGE_BLACK,
			shadowOffset: { width: 1, height: 2 },
			shadowOpacity: 0.5,
			elevation: 2,
		},
	});
