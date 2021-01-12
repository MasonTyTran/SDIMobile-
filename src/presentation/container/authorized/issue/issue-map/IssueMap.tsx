import React from 'react';
import {StyleSheet, View} from 'react-native';

import {WebView} from 'react-native-webview';
import {Header, Icon} from 'react-native-elements';

import {TextView} from '@components';
import {Colors} from '@resources';

import {IssueMapProps} from './types';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const IssueMap: React.FC<IssueMapProps> = (props) => {
  
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
        <TouchableOpacity style={styles.fab}>
          <Icon color={'white'} name="home" type="ionicon" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const FABSize = 65;

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
  fab: {
    position: 'absolute',
    bottom: 36,
    right: 36,
    width: FABSize,
    height: FABSize,
    borderRadius: FABSize * 0.5,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
