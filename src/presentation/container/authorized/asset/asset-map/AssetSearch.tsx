import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {Icon} from 'react-native-elements';

import {TextField} from '@components';
import {Colors} from '@resources';

export interface AssetSearchProps {
  onSearch: () => void;
}

export const AssetSearch: React.FC<AssetSearchProps> = ({onSearch}) => {
  return (
    <View style={styles.container}>
      <TextField
        containerStyle={styles.input}
        inputProps={{editable: false}}
        suffix={
          <Icon
            containerStyle={styles.icon}
            color={'white'}
            type="ionicon"
            name="search"
          />
        }
      />
      <Pressable style={StyleSheet.absoluteFillObject} onPress={onSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    left: 16,
    right: 16,
    marginHorizontal: 16,
  },
  input: {
    backgroundColor: '#bbb',
  },
  icon: {
    height: '100%',
    width: 40,
    marginRight: -8,
    justifyContent: 'center',
    backgroundColor: Colors.gray,
  },
});
