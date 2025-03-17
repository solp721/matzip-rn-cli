import { useRef, useEffect, useState } from 'react';
import MapView, { LatLng, Region } from 'react-native-maps';
import useLocationStore from '@/store/useLocationStore';
import { numbers } from '@/constants';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

function useMoveMapView() {
	const mapRef = useRef<MapView | null>(null);
	const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIA_DELTA);

	const { moveLocation } = useLocationStore();

	const moveMapView = (coordinate: LatLng, delta?: Delta) => {
		mapRef.current?.animateToRegion({
			...coordinate,
			...(delta || regionDelta),
		});
	};

	const handleChangeDelta = (region: Region) => {
		const { latitudeDelta, longitudeDelta } = region;
		setRegionDelta({ latitudeDelta, longitudeDelta });
	};

	useEffect(() => {
		if (moveLocation) {
			moveMapView(moveLocation);
		}
	}, [moveLocation]);

	return { mapRef, moveMapView, handleChangeDelta };
}

export default useMoveMapView;
