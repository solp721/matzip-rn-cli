import useDetailStore from '@/store/useDetailPostStore';
import ImageCarousel from '@/components/common/ImageCarousel';
import { StackScreenProps } from '@react-navigation/stack';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { feedNavigations } from '@/constants';

type ImageZoomScreenProps = StackScreenProps<
	FeedStackParamList,
	typeof feedNavigations.IMAGE_ZOOM
>;

export default function ImageZoomScreen({ route }: ImageZoomScreenProps) {
	const { index } = route.params;
	const { detailPost } = useDetailStore();

	return (
		<ImageCarousel images={detailPost?.images ?? []} pressedIndex={index} />
	);
}
