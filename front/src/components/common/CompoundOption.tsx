import { PropsWithChildren, ReactNode, createContext, useContext } from 'react';
import {
	GestureResponderEvent,
	Modal,
	ModalProps,
	Pressable,
	PressableProps,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { colors } from '@/constants';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconProps } from 'react-native-vector-icons/Icon';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

const IonIcon = IonIcons as unknown as React.ComponentType<IconProps>;
const MaterialIcon = MaterialIcons as unknown as React.ComponentType<IconProps>;
interface OptionContextValue {
	onClickOutSide?: (event: GestureResponderEvent) => void;
}

const OptionContext = createContext<OptionContextValue | undefined>(undefined);

interface OptionMainProps extends ModalProps {
	children: ReactNode;
	isVisible: boolean;
	hideOption: () => void;
	animationType?: ModalProps['animationType'];
}

function OptionMain({
	children,
	isVisible,
	hideOption,
	animationType = 'slide',
	...props
}: OptionMainProps) {
	const onClickOutSide = (event: GestureResponderEvent) => {
		if (event.target === event.currentTarget) {
			hideOption();
		}
	};

	return (
		<Modal
			visible={isVisible}
			transparent={true}
			animationType={animationType}
			onRequestClose={hideOption}
			{...props}
		>
			<OptionContext.Provider value={{ onClickOutSide }}>
				{children}
			</OptionContext.Provider>
		</Modal>
	);
}

function Background({ children }: PropsWithChildren) {
	const { theme } = useThemeStorage();
	const styles = styling(theme);
	const optionContext = useContext(OptionContext);

	return (
		<SafeAreaView
			style={styles.optionBackground}
			onTouchEnd={optionContext?.onClickOutSide}
		>
			{children}
		</SafeAreaView>
	);
}

function Container({ children }: PropsWithChildren) {
	const { theme } = useThemeStorage();
	const styles = styling(theme);

	return <View style={styles.optionContainer}>{children}</View>;
}

interface ButtonProps extends PressableProps {
	children: ReactNode;
	isDanger?: boolean;
	isChecked?: boolean;
}

function Button({
	children,
	isDanger = false,
	isChecked = false,
	...props
}: ButtonProps) {
	const { theme } = useThemeStorage();
	const styles = styling(theme);

	return (
		<Pressable
			style={({ pressed }) => [
				pressed && styles.optionButtonPressed,
				styles.optionButton,
			]}
			{...props}
		>
			<Text style={[styles.optionText, isDanger && styles.dangerText]}>
				{children}
			</Text>
			{isChecked && (
				<IonIcon name="checkmark" size={20} color={colors[theme].BLUE_500} />
			)}
		</Pressable>
	);
}

function Title({ children }: PropsWithChildren) {
	const { theme } = useThemeStorage();
	const styles = styling(theme);

	return (
		<View style={styles.titleContainer}>
			<Text style={styles.titleText}>{children}</Text>
		</View>
	);
}

function Divider() {
	const { theme } = useThemeStorage();
	const styles = styling(theme);

	return <View style={styles.border} />;
}

interface CheckBoxProps extends PressableProps {
	children: ReactNode;
	icon?: ReactNode;
	isChecked: boolean;
}

function CheckBox({
	children,
	icon,
	isChecked = false,
	...props
}: CheckBoxProps) {
	const { theme } = useThemeStorage();
	const styles = styling(theme);

	return (
		<Pressable
			{...props}
			style={({ pressed }) => [
				pressed && styles.optionButtonPressed,
				styles.checkBoxContainer,
			]}
		>
			<IonIcon
				name={`checkmark-circle${isChecked ? '' : '-outline'}`}
				size={22}
				color={colors[theme].BLUE_500}
			/>
			{icon}
			<Text style={styles.checkBoxText}>{children}</Text>
		</Pressable>
	);
}

interface FilterProps extends PressableProps {
	children: ReactNode;
	isSelected?: boolean;
}

function Filter({ children, isSelected, ...props }: FilterProps) {
	const { theme } = useThemeStorage();
	const styles = styling(theme);

	return (
		<Pressable style={styles.filterContainer} {...props}>
			<Text style={isSelected ? styles.filterSelectedText : styles.filterText}>
				{children}
			</Text>
			<MaterialIcon
				name="keyboard-arrow-down"
				size={22}
				color={isSelected ? colors[theme].BLUE_500 : colors[theme].GRAY_500}
			/>
		</Pressable>
	);
}

export const CompoundOption = Object.assign(OptionMain, {
	Container,
	Background,
	Button,
	Title,
	Divider,
	CheckBox,
	Filter,
});

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		optionBackground: {
			flex: 1,
			justifyContent: 'flex-end',
			backgroundColor: 'rgba(0 0 0 / 0.5)',
		},
		optionContainer: {
			borderRadius: 15,
			marginHorizontal: 10,
			marginBottom: 10,
			backgroundColor: colors[theme].GRAY_100,
			overflow: 'hidden',
		},
		optionButton: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			height: 50,
			gap: 5,
		},
		optionButtonPressed: {
			backgroundColor: colors[theme].GRAY_200,
		},
		optionText: {
			fontSize: 17,
			color: colors[theme].BLUE_500,
			fontWeight: '500',
		},
		dangerText: {
			color: colors[theme].RED_500,
		},
		titleContainer: {
			alignItems: 'center',
			padding: 15,
		},
		titleText: {
			fontSize: 16,
			fontWeight: '500',
			color: colors[theme].BLACK,
		},
		border: {
			borderBottomColor: colors[theme].GRAY_200,
			borderBottomWidth: 1,
		},
		checkBoxContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingVertical: 10,
			paddingHorizontal: 30,
			gap: 10,
		},
		checkBoxText: {
			fontSize: 15,
			color: colors[theme].BLACK,
		},
		filterContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			padding: 10,
			gap: 5,
		},
		filterText: {
			fontSize: 15,
			fontWeight: '500',
			color: colors[theme].GRAY_300,
		},
		filterSelectedText: {
			fontSize: 15,
			fontWeight: '500',
			color: colors[theme].BLUE_500,
		},
	});
