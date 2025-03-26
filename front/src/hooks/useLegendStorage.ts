import useLegendStore from '@/store/useLegendStore';
import { useEffect } from 'react';
import { getEncryptedStorage, setEncryptedStorage } from '@/utils';
import { stroageKeys } from '@/constants/keys';

function useLegendStorage() {
	const { isVisible, setIsVisible } = useLegendStore();

	const set = async (flag: boolean) => {
		await setEncryptedStorage(stroageKeys.SHOW_LEGEND, flag);
		setIsVisible(flag);
	};

	useEffect(() => {
		(async () => {
			const storedData = await getEncryptedStorage(stroageKeys.SHOW_LEGEND);
			const isVisible = typeof storedData === 'boolean' ? storedData : false;
			setIsVisible(isVisible);
		})();
	}, [setIsVisible]);

	return { isVisible, set };
}

export default useLegendStorage;
