type UserInformation = {
	email: string;
	password: string;
};

function validateUser(values: UserInformation) {
	const errors = {
		email: '',
		password: '',
	};

	if (
		!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
			values.email,
		)
	) {
		errors.email = '이메일 형식이 올바르지 않습니다.';
	}

	if (!(values.password.length >= 8 && values.password.length <= 20)) {
		errors.password = '비밀번호는 8자 이상 20자 이하여야 합니다.';
	}

	return errors;
}

function validateLogin(values: UserInformation) {
	return validateUser(values);
}

function validateSignup(values: UserInformation & { passwordConfirm: string }) {
	const errors = validateUser(values);

	const signupErrors = {
		...errors,
		passwordConfirm: '',
	};

	if (values.password !== values.passwordConfirm) {
		signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
	}

	return signupErrors;
}

export { validateLogin, validateSignup };
