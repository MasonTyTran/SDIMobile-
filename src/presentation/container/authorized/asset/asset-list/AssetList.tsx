import React from 'react';
import {StyleSheet} from 'react-native';

import {Header, Icon} from 'react-native-elements';

import {TextView} from '@components';
import {Colors} from '@resources';

import {AssetListProps} from './types';
import {AssetListTab} from './AssetListTab';

export const AssetList: React.FC<AssetListProps> = (props) => {
  return (
    <>
      <Header
        leftComponent={
          <Icon
            onPress={props.navigation.openDrawer}
            color={'white'}
            type="ionicon"
            name="menu"
          />
        }
        centerComponent={<TextView text="Asset List" style={styles.header} />}
        backgroundColor={Colors.gray}
      />
      <AssetListTab navigation={props.navigation} />
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
