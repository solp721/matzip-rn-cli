import { colors } from '@/constants/colors';
import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconProps } from 'react-native-vector-icons/Icon';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

interface ImageInputProps {
	onChange: () => void;
}

const Ionicon = Ionicons as unknown as React.ComponentType<IconProps>;

export default function ImageInput({ onChange }: ImageInputProps) {
	const { theme } = useThemeStorage();
	const styles = styling(theme);

	return (
		<Pressable
			style={({ pressed }) => [
				pressed && styles.imageInputPressed,
				styles.imageInput,
			]}
			onPress={onChange}
		>
			<Ionicon name="camera-outline" size={20} color={colors[theme].GRAY_500} />
			<Text style={styles.inputText}>사진 추가</Text>
		</Pressable>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		imageInput: {
			borderWidth: 1.5,
			borderStyle: 'dotted',
			borderColor: colors[theme].GRAY_300,
			height: 70,
			width: 70,
			alignItems: 'center',
			justifyContent: 'center',
			gap: 5,
		},
		imageInputPressed: {
			opacity: 0.5,
		},
		inputText: {
			fontSize: 12,
			color: colors[theme].GRAY_500,
		},
	});
