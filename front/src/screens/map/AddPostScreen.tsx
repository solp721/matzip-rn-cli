import { StackScreenProps } from '@react-navigation/stack';
import { mapNavigations } from '@/constants';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import PostForm from '@/components/post/PostForm';

type AddPostScreenProps = StackScreenProps<
	MapStackParamList,
	typeof mapNavigations.ADD_POST
>;

export default function AddPostScreen({ route }: AddPostScreenProps) {
	const { location } = route.params;

	return <PostForm location={location} />;
}
