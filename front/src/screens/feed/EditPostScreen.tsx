import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { feedNavigations } from '@/constants';
import PostForm from '@/components/post/PostForm';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';

type EditPostScreenProps = StackScreenProps<
	FeedStackParamList,
	typeof feedNavigations.EDIT_POST
>;

export default function EditPostScreen({ route }: EditPostScreenProps) {
	const { location } = route.params;

	return <PostForm location={location} isEdit />;
}
