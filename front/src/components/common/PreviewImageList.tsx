import {
	Platform,
	Image,
	ScrollView,
	View,
	StyleSheet,
	Pressable,
} from 'react-native';
import { ImageUri } from '@/types';
import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import { IconProps } from 'react-native-vector-icons/Icon';

interface PreviewImageListProps {
	imageUris: ImageUri[];
	onDelete: (uri: string) => void;
	onChangeOrder: (fromIndex: number, toIndex: number) => void;
	showOption?: boolean;
}

const IonIcon = IonIcons as unknown as React.ComponentType<IconProps>;

export default function PreviewImageList({
	imageUris,
	onDelete,
	onChangeOrder,
	showOption = false,
}: PreviewImageListProps) {
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			<View style={styles.container}>
				{imageUris.map(({ uri }, index) => {
					return (
						<View key={uri} style={styles.imageContainer}>
							<Pressable>
								<Image
									style={styles.image}
									source={{
										uri: `${
											Platform.OS === 'ios'
												? 'http://localhost:3030/'
												: 'http://10.0.2.2:3030/'
										}${uri}`,
									}}
									resizeMode="cover"
								/>
								{showOption && (
									<>
										<Pressable
											style={[styles.imageButton, styles.deleteButton]}
											onPress={() => onDelete && onDelete(uri)}
										>
											<IonIcon name={'close'} size={16} color={colors.WHITE} />
										</Pressable>

										{index > 0 && (
											<Pressable
												style={[styles.imageButton, styles.moveLeftButton]}
												onPress={() =>
													onChangeOrder && onChangeOrder(index, index - 1)
												}
											>
												<IonIcon
													name={'arrow-back-outline'}
													size={16}
													color={colors.WHITE}
												/>
											</Pressable>
										)}
										{index < imageUris.length - 1 && (
											<Pressable
												style={[styles.imageButton, styles.moveRightButton]}
												onPress={() =>
													onChangeOrder && onChangeOrder(index, index + 1)
												}
											>
												<IonIcon
													name={'arrow-forward-outline'}
													size={16}
													color={colors.WHITE}
												/>
											</Pressable>
										)}
									</>
								)}
							</Pressable>
						</View>
					);
				})}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 15,
		gap: 15,
	},
	imageContainer: {
		width: 70,
		height: 70,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	imageButton: {
		position: 'absolute',
		backgroundColor: colors.BLACK,
		zIndex: 1,
	},
	deleteButton: {
		top: 0,
		right: 0,
	},
	moveLeftButton: {
		bottom: 0,
		left: 0,
	},
	moveRightButton: {
		bottom: 0,
		right: 0,
	},
});
