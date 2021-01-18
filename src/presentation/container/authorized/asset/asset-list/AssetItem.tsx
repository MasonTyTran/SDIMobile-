import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {TextView} from '@components';
import {TextStyles} from '@resources';
import {Divider} from 'react-native-elements';
import {Asset, AssetDataObject} from '@data';
export interface AssetItemProps {
  item: Asset;
  onPress: (item: Asset) => void;
}
export const AssetItem: React.FC<AssetItemProps> = ({item, onPress}) => {
  const arr = JSON.parse(item.datajson) as AssetDataObject[];
  const data = arr.reduce((acc, curr) => {
    acc[curr.name] = curr.value;
    return acc;
  });
  const onPressItem = React.useCallback(() => {
    onPress(item);
  }, [item, onPress]);
  return (
    <Pressable onPress={onPressItem} style={styles.container}>
      <TextView style={styles.title} text={data['value']} />
      <TextView style={{}} text={`#${item.id}`} />
      <Divider />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 8,
  },

  title: {
    ...TextStyles.mdTitle,
    flex: 1,
    marginRight: 8,
  },
});
