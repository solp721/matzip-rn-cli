import React, { useRef } from 'react';
import { View, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { InputField } from '@/components/common/InputField';
import useForm from '@/hooks/useForm';
import CustomButton from '@/components/common/CustomButton';
import { validateSignup } from '@/utils';
import { useAuth } from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import { errorMessages } from '@/constants/messages';

export default function SignupScreen() {
	const passwordRef = useRef<TextInput | null>(null);
	const passwordConfirmRef = useRef<TextInput | null>(null);
	const { signupMutation, loginMutation } = useAuth();
	const signup = useForm({
		initialValues: {
			email: '',
			password: '',
			passwordConfirm: '',
		},
		validate: validateSignup,
	});

	const handleSubmit = () => {
		const { email, password } = signup.values;
		signupMutation.mutate(
			{ email, password },
			{
				onSuccess: () => loginMutation.mutate({ email, password }),
				onError: error => {
					Toast.show({
						type: 'error',
						text1:
							error.response?.data.message || errorMessages.UNEXPECTED_ERROR,
						position: 'bottom',
						visibilityTime: 2000,
					});
				},
			},
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.inputContainer}>
				<InputField
					autoFocus
					placeholder="이메일"
					error={signup.errors.email}
					touched={signup.touched.email}
					inputMode="email"
					returnKeyType="next"
					blurOnSubmit={false}
					onSubmitEditing={() => passwordRef.current?.focus()}
					{...signup.getTextInputProps('email')}
				/>
				<InputField
					ref={passwordRef}
					placeholder="비밀번호"
					textContentType="oneTimeCode"
					error={signup.errors.password}
					touched={signup.touched.password}
					secureTextEntry
					returnKeyType="next"
					blurOnSubmit={false}
					onSubmitEditing={() => passwordConfirmRef.current?.focus()}
					{...signup.getTextInputProps('password')}
				/>
				<InputField
					ref={passwordConfirmRef}
					placeholder="비밀번호 확인"
					error={signup.errors.passwordConfirm}
					touched={signup.touched.passwordConfirm}
					secureTextEntry
					onSubmitEditing={handleSubmit}
					{...signup.getTextInputProps('passwordConfirm')}
				/>
			</View>
			<CustomButton
				onPress={handleSubmit}
				label="회원가입"
				variant="filled"
				size="large"
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 30,
	},
	inputContainer: {
		gap: 20,
		marginBottom: 30,
	},
});
