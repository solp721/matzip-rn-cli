import { getEncryptedStorage, setEncryptedStorage } from '@/utils';
import { useEffect } from 'react';
import useMarkerFilterStore from '@/store/useMarkerFilterStore';
import { Marker } from '@/types';
import { stroageKeys } from '@/constants';

const initialFilters = {
	RED: true,
	YELLOW: true,
	GREEN: true,
	BLUE: true,
	PURPLE: true,
	'1': true,
	'2': true,
	'3': true,
	'4': true,
	'5': true,
};

export default function useMarkerFilter() {
	const { filterItems, setFilterItems } = useMarkerFilterStore();

	const set = async (items: Record<string, boolean>) => {
		await setEncryptedStorage(stroageKeys.MARKER_FILTER, items);
		setFilterItems(items);
	};

	const transformFilteredMarker = (markers: Marker[]) => {
		return markers.filter(marker => {
			return (
				filterItems[marker.color] === true &&
				filterItems[String(marker.score)] === true
			);
		});
	};

	useEffect(() => {
		(async () => {
			const storedData =
				(await getEncryptedStorage(stroageKeys.MARKER_FILTER)) ??
				initialFilters;
			setFilterItems(storedData as Record<string, boolean>);
		})();
	}, []);

	return { set, items: filterItems, transformFilteredMarker };
}
