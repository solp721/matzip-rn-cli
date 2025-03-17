import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, PressableProps } from 'react-native';
import { colors } from '@/constants/colors';

interface HeaderButtonProps extends PressableProps {
	labelText?: string;
	icon?: ReactNode;
	hasError?: boolean;
}

export default function HeaderButton({
	labelText,
	icon,
	hasError = false,
	...props
}: HeaderButtonProps) {
	return (
		<Pressable disabled={hasError} style={styles.container} {...props}>
			{!labelText && icon}
			{!icon && labelText && (
				<Text style={[styles.text, hasError && styles.textError]}>
					{labelText}
				</Text>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	text: {
		fontSize: 15,
		fontWeight: '500',
		color: colors.PINK_700,
	},
	textError: {
		color: colors.GRAY_200,
	},
});
