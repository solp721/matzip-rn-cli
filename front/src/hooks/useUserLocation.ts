import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';
import useAppState from './useAppState';
export default function useUserLocation() {
	const [userLocation, setUserLocation] = useState<LatLng>({
		latitude: 35.14525467924572,
		longitude: 129.00755713706002,
	});
	const [isUserLocationError, setIsUserLocationError] = useState(false);
	const { isComback } = useAppState();

	useEffect(() => {
		Geolocation.getCurrentPosition(
			info => {
				const { latitude, longitude } = info.coords;
				setUserLocation({ latitude, longitude });
				setIsUserLocationError(false);
			},
			() => {
				setIsUserLocationError(true);
			},
			{
				enableHighAccuracy: true,
			},
		);
		console.log(userLocation);
	}, [isComback]);

	return { userLocation, isUserLocationError };
}
