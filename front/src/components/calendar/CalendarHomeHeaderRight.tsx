import HeaderButton from '../common/HeaderButton';

export default function CalendarHomeHeaderRight(onPress: () => void) {
	return <HeaderButton labelText="오늘" onPress={onPress} />;
}
