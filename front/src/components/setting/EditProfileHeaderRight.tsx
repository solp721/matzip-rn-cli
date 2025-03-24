import HeaderButton from '../common/HeaderButton';

export default function EditProfileHeaderRight(onSubmit: () => void) {
	return <HeaderButton labelText="완료" onPress={onSubmit} />;
}
