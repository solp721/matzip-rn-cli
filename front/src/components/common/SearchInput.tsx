import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import { IconProps } from 'react-native-vector-icons/Icon';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

const IonIcon = Ionicons as unknown as React.ComponentType<IconProps>;

interface SearchInputProps extends TextInputProps {
	onSubmit: () => void;
}

export default function SearchInput({ onSubmit, ...props }: SearchInputProps) {
	const { theme } = useThemeStorage();
	const styles = styling(theme);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				autoCapitalize="none"
				placeholderTextColor={colors[theme].GRAY_500}
				returnKeyType="search"
				onSubmitEditing={onSubmit}
				clearButtonMode="while-editing"
				{...props}
			/>
			<IonIcon
				name={'search'}
				color={colors[theme].GRAY_700}
				size={20}
				onPress={onSubmit}
			/>
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			borderWidth: 1,
			borderColor: colors[theme].GRAY_200,
			paddingVertical: 8,
			paddingHorizontal: 10,
			borderRadius: 5,
		},
		input: {
			flex: 1,
			fontSize: 16,
			paddingVertical: 0,
			paddingLeft: 0,
			color: colors[theme].BLACK,
		},
	});
