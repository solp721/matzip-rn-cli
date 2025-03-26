import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { getEncryptedStorage, setEncryptedStorage } from '@/utils';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

export default function useThemeStorage() {
	const systemTheme = useColorScheme();
	const { theme, isSystem, setTheme, setSystemTheme } = useThemeStore();

	const setMode = async (mode: ThemeMode) => {
		await setEncryptedStorage('themeMode', mode);
		setTheme(mode);
	};

	const setSystem = async (flag: boolean) => {
		await setEncryptedStorage('themeSystem', flag);
		setSystemTheme(flag);
	};

	useEffect(() => {
		(async () => {
			const mode =
				((await getEncryptedStorage('themeMode')) as ThemeMode) || 'light';
			const systemMode = (await getEncryptedStorage('themeSystem')) === true;
			const newMode = systemMode ? systemTheme : mode;
			setTheme(newMode as ThemeMode);
			setSystemTheme(systemMode);
		})();
	}, [setTheme, setSystemTheme, systemTheme]);

	return { theme, isSystem, setMode, setSystem };
}
