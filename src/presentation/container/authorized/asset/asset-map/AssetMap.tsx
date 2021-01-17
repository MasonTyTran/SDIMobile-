import React from 'react';
import {StyleSheet, View} from 'react-native';

import {WebView} from 'react-native-webview';
import {Header, Icon} from 'react-native-elements';

import {TextView} from '@components';
import {Colors} from '@resources';

import {AssetMapProps} from './types';
import {AssetSearch} from './AssetSearch';

export const AssetMap: React.FC<AssetMapProps> = (props) => {
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
        centerComponent={
          <TextView text="Mạng lưới sự cố" style={styles.header} />
        }
        backgroundColor={Colors.gray}
      />
      <View style={styles.container}>
        <WebView
          style={styles.webview}
          source={{uri: 'https://hue.aktivmap.com/GIS/MainMap'}}
        />
        <AssetSearch onSearch={() => props.navigation.navigate('AssetList')} />
      </View>
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
  webview: {
    flex: 1,
  },
});
