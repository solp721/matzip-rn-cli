import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View,
	TextInput,
} from 'react-native';
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
import { LatLng } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import useDetailStore from '@/store/useDetailPostStore';
import useMutateUpdatePost from '@/hooks/queries/useMutateUpdatePost';
import useThemeStorage from '@/hooks/useThemeStorage';

const OctIcon = Octicons as unknown as React.ComponentType<IconProps>;

type PostFormProps = {
	isEdit?: boolean;
	location: LatLng;
};

export default function PostForm({ location, isEdit = false }: PostFormProps) {
	const { theme } = useThemeStorage();
	const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
	const descriptionRef = useRef<TextInput | null>(null);
	const createPost = useMutateCreatePost();
	const { detailPost } = useDetailStore();
	const isEditMode = isEdit && detailPost;
	const updatePost = useMutateUpdatePost();

	const addPost = useForm({
		initialValues: {
			title: isEditMode ? detailPost.title : '',
			description: isEditMode ? detailPost.description : '',
		},
		validate: validateAddPost,
	});

	const [markerColor, setMarkerColor] = useState<MarkerColor>(
		isEditMode ? detailPost.color : 'RED',
	);
	const [score, setScore] = useState(isEditMode ? detailPost.score : 5);
	const [date, setDate] = useState(
		isEditMode ? new Date(String(detailPost?.date)) : new Date(),
	);
	const [isPickedDate, setIsPickedDate] = useState(false);
	const imagePicker = useImagePicker({
		initialImages: isEditMode ? detailPost.images : [],
	});
	const datePickerModal = useModal();

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
		datePickerModal.hide();
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

		if (isEditMode) {
			updatePost.mutate(
				{
					id: detailPost.id,
					body,
				},
				{
					onSuccess: () => navigation.goBack(),
				},
			);
			return;
		}

		createPost.mutate(
			{ address, ...location, ...body },
			{
				onSuccess: () => navigation.goBack(),
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
						icon={
							<OctIcon
								name="location"
								size={24}
								color={colors[theme].GRAY_500}
							/>
						}
					/>
					<CustomButton
						variant="outlined"
						size="large"
						label={
							isPickedDate || isEdit
								? getDateWithSeparator(date, '.')
								: '날짜 선택'
						}
						onPress={datePickerModal.show}
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
						isVisible={datePickerModal.isVisible}
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
