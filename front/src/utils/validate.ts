import { Category } from '@/types';

function isBlank(value: string) {
	return value.trim() === '';
}

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

function validateAddPost(values: { title: string; description: string }) {
	const errors = {
		title: '',
		description: '',
	};

	if (isBlank(values.title)) {
		errors.title = '제목은 1~30자 이내여야 합니다.';
	}

	return errors;
}

function validateEditProfile(values: { nickname: string }) {
	const errors = {
		nickname: '',
	};

	if (isBlank(values.nickname)) {
		errors.nickname = '닉네임은 1~10자 이내여야 합니다.';
	}

	return errors;
}

function validateCategory(values: Category) {
	const errors = {
		RED: '',
		YELLOW: '',
		GREEN: '',
		BLUE: '',
		PURPLE: '',
	};

	['RED', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE'].forEach(color => {
		if (isBlank(values[color as keyof Category])) {
			errors[color as keyof typeof errors] = '카테고리를 입력해주세요.';
		}
	});

	return errors;
}

export {
	validateLogin,
	validateSignup,
	validateAddPost,
	validateEditProfile,
	validateCategory,
};
