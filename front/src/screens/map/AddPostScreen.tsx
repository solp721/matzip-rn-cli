import { StackScreenProps } from '@react-navigation/stack';
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View,
	TextInput,
} from 'react-native';
import { mapNavigations } from '@/constants';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { InputField } from '@/components/common/InputField';
import { colors } from '@/constants/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import { IconProps } from 'react-native-vector-icons/Icon';
import useForm from '@/hooks/useForm';
import { validateAddPost } from '@/utils/validate';
import { useEffect, useRef, useState } from 'react';
import CustomButton from '@/components/common/CustomButton';
import AddPostHeaderRight from '@/components/post/AddPostHeaderRight';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import { MarkerColor } from '@/types/domain';
import useGetAddress from '@/hooks/useGetAddress';
import MarkerSelector from '@/components/post/MarkerSelector';
import ScoreInput from '@/components/post/ScoreInput';
import DatePickerOption from '@/components/post/DatePickerOption';
import { getDateWithSeparator } from '@/utils/date';
import useModal from '@/hooks/useModal';
import ImageInput from '@/components/post/ImageInput';
import usePermission from '@/hooks/usePermission';
import useImagePicker from '@/hooks/useImagePicker';
import PreviewImageList from '@/components/common/PreviewImageList';

type AddPostScreenProps = StackScreenProps<
	MapStackParamList,
	typeof mapNavigations.ADD_POST
>;

const OctIcon = Octicons as unknown as React.ComponentType<IconProps>;

export default function AddPostScreen({
	route,
	navigation,
}: AddPostScreenProps) {
	const { location } = route.params;
	const descriptionRef = useRef<TextInput | null>(null);
	const createPost = useMutateCreatePost();

	const addPost = useForm({
		initialValues: {
			title: '',
			description: '',
		},
		validate: validateAddPost,
	});

	const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
	const [score, setScore] = useState(5);
	const [date, setDate] = useState(new Date());
	const [isPickedDate, setIsPickedDate] = useState(false);
	const imagePicker = useImagePicker({
		initialImages: [],
	});
	const dateOption = useModal();

	usePermission('PHOTO');

	const address = useGetAddress(location);

	const handleSelectMarker = (name: MarkerColor) => {
		setMarkerColor(name);
	};

	const handleChangeDate = (pickedDate: Date) => {
		setDate(pickedDate);
	};

	const handleConfirmDate = () => {
		setIsPickedDate(true);
		dateOption.hide();
	};

	const handleSubmit = () => {
		const body = {
			date,
			title: addPost.values.title,
			description: addPost.values.description,
			color: markerColor,
			score,
			imageUris: imagePicker.imageUris,
		};
		console.log(body);

		createPost.mutate(
			{ address, ...location, ...body },
			{
				onSuccess: () => {
					navigation.goBack();
				},
				onError: error => {
					console.error('게시물 등록 실패:', error);
				},
			},
		);
	};

	const handleChangeScore = (value: number) => {
		setScore(value);
	};

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => AddPostHeaderRight(handleSubmit),
		});
	});

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.contentContainer}>
				<View style={styles.inputContainer}>
					<InputField
						value={address}
						disabled
						icon={<OctIcon name="location" size={24} color={colors.GRAY_500} />}
					/>
					<CustomButton
						variant="outlined"
						size="large"
						label={isPickedDate ? getDateWithSeparator(date, '.') : '날짜 선택'}
						onPress={dateOption.show}
					/>
					<InputField
						placeholder="제목을 입력하세요"
						error={addPost.errors.title}
						touched={addPost.touched.title}
						returnKeyType="next"
						blurOnSubmit={false}
						onSubmitEditing={() => descriptionRef.current?.focus()}
						{...addPost.getTextInputProps('title')}
					/>
					<InputField
						ref={descriptionRef}
						placeholder="기록하고 싶은 내용을 입력하세요.(선택)"
						error={addPost.errors.description}
						touched={addPost.touched.description}
						returnKeyType="next"
						multiline
						{...addPost.getTextInputProps('description')}
					/>
					<MarkerSelector
						score={score}
						markerColor={markerColor}
						onPressMarker={handleSelectMarker}
					/>
					<ScoreInput score={score} onChangeScore={handleChangeScore} />
					<View style={styles.imageViewer}>
						<ImageInput onChange={imagePicker.handleChange} />
						<PreviewImageList
							imageUris={imagePicker.imageUris}
							onDelete={imagePicker.deleteImageUri}
							onChangeOrder={imagePicker.changeImageUrisOrder}
							showOption={true}
						/>
					</View>
					<DatePickerOption
						date={date}
						isVisible={dateOption.isVisible}
						onChangeDate={handleChangeDate}
						onConfirmDate={handleConfirmDate}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		flex: 1,
		padding: 20,
		marginBottom: 10,
	},
	inputContainer: {
		gap: 10,
	},
	imageViewer: {
		flexDirection: 'row',
	},
});
