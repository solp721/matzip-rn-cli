import React, { ForwardedRef, forwardRef, ReactNode, useRef } from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	Dimensions,
	TextInputProps,
	Text,
	Pressable,
	ScrollView,
} from 'react-native';
import { colors } from '@/constants';
import { mergeRefs } from '@/utils';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

interface InputFieldProps extends TextInputProps {
	disabled?: boolean;
	error?: string;
	touched?: boolean;
	icon?: ReactNode;
}

const deviceHeight = Dimensions.get('screen').height;

export const InputField = forwardRef(
	(
		{ disabled, error, touched, icon = null, ...props }: InputFieldProps,
		ref?: ForwardedRef<TextInput>,
	) => {
		const innerRef = useRef<TextInput | null>(null);

		const handlePressInput = () => {
			innerRef.current?.focus();
		};
		const { theme } = useThemeStorage();
		const styles = styling(theme);

		return (
			<Pressable onPress={handlePressInput}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={[
						styles.container,
						disabled && styles.disabled,
						props.multiline && styles.multiline,
						touched && Boolean(error) && styles.inputError,
					]}
				>
					<View style={Boolean(icon) && styles.innerContainer}>
						{icon}
						<TextInput
							ref={ref ? mergeRefs(innerRef, ref) : innerRef}
							editable={!disabled}
							placeholderTextColor={colors[theme].GRAY_500}
							style={[styles.input, disabled && styles.disabled]}
							autoCapitalize="none"
							spellCheck={false}
							autoCorrect={false}
							{...props}
						/>
						{touched && Boolean(error) && (
							<Text style={styles.error}>{error}</Text>
						)}
					</View>
				</ScrollView>
			</Pressable>
		);
	},
);

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			borderWidth: 1,
			borderColor: colors[theme].GRAY_200,
			padding: deviceHeight > 700 ? 15 : 10,
			overflow: 'hidden',
		},
		innerContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 5,
		},
		input: {
			fontSize: 16,
			color: colors[theme].BLACK,
			padding: 0,
		},
		disabled: {
			backgroundColor: colors[theme].GRAY_200,
			color: colors[theme].GRAY_700,
		},
		inputError: {
			borderWidth: 1,
			borderColor: colors[theme].RED_300,
		},
		error: {
			color: colors[theme].RED_500,
			fontSize: 12,
			paddingTop: 5,
		},
		multiline: {
			paddingBottom: deviceHeight > 700 ? 45 : 30,
		},
	});
