import HeaderButton from '../common/HeaderButton';

export default function EditCategoryHeaderRight(onSubmit: () => void) {
	return <HeaderButton labelText="저장" onPress={onSubmit} />;
}
