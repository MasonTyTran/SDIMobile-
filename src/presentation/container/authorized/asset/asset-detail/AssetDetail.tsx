import React from 'react';
import {StyleSheet} from 'react-native';

import {Header, Icon} from 'react-native-elements';

import {TextView} from '@components';
import {Colors} from '@resources';

import {AssetDetailProps} from './types';
import {AssetInfo} from './AssetInfo';

export const AssetDetail: React.FC<AssetDetailProps> = (props) => {
  const asset = props.route.params.asset;
  return (
    <>
      <Header
        leftComponent={
          <Icon
            onPress={() => props.navigation.pop()}
            color={'white'}
            type="ionicon"
            name="arrow-back"
          />
        }
        centerComponent={
          <TextView text="Chi tiết tài sản" style={styles.header} />
        }
        backgroundColor={Colors.gray}
      />
      <AssetInfo item={asset} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  tabBarStyle: {backgroundColor: 'white'},
});
