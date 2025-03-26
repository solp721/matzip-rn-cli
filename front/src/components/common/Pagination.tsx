import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import { IconProps } from 'react-native-vector-icons/Icon';

const OctIcon = Octicons as unknown as React.ComponentType<IconProps>;

import { colors } from '@/constants';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

interface PaginationProps {
	pageParam: number;
	fetchPrevPage: () => void;
	fetchNextPage: () => void;
	hasNextPage: boolean;
	totalLength: number;
}

export default function Pagination({
	pageParam,
	fetchPrevPage,
	fetchNextPage,
	hasNextPage,
	totalLength,
}: PaginationProps) {
	const { theme } = useThemeStorage();
	const styles = styling(theme);

	return (
		<View style={styles.container}>
			<Pressable
				onPress={fetchPrevPage}
				style={styles.pageButton}
				disabled={pageParam <= 1}
			>
				<OctIcon
					name="arrow-left"
					size={15}
					color={pageParam > 1 ? colors[theme].BLACK : colors[theme].GRAY_300}
					onPress={fetchPrevPage}
					disabled={pageParam <= 1}
				/>
				<Text style={pageParam > 1 ? styles.pageText : styles.disabledPageText}>
					이전페이지
				</Text>
			</Pressable>

			<Pressable
				onPress={fetchNextPage}
				style={styles.pageButton}
				disabled={totalLength === 0 || !hasNextPage}
			>
				<Text
					style={
						totalLength > 0 && hasNextPage
							? styles.pageText
							: styles.disabledPageText
					}
				>
					다음페이지
				</Text>
				<OctIcon
					name="arrow-right"
					size={15}
					color={
						totalLength > 0 && hasNextPage
							? colors[theme].BLACK
							: colors[theme].GRAY_300
					}
					onPress={fetchNextPage}
					disabled={totalLength === 0 || !hasNextPage}
				/>
			</Pressable>
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginTop: 10,
			marginHorizontal: 5,
		},
		pageButton: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 5,
			height: 25,
		},
		pageText: {
			fontSize: 15,
			color: colors[theme].BLACK,
		},
		disabledPageText: {
			fontSize: 15,
			color: colors[theme].GRAY_300,
		},
	});
