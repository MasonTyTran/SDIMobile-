import {TextView} from '@components';
import {RxRemoteProvider} from '@core';
import {AppDependencies} from '@di';
import {Colors} from '@resources';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {WebView} from 'react-native-webview';
import {container} from 'tsyringe';
import {AddIssue} from './AddIssue';
import {IssueMapProps} from './types';

export const IssueMap: React.FC<IssueMapProps> = (props) => {
  const provider = container.resolve<RxRemoteProvider>(
    AppDependencies.ApiProvider,
  );
  console.warn(provider.token);
  const [addVisible, setAddVisible] = React.useState(false);
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
          source={{
            uri: 'https://hue.aktivmap.com/GIS/MainMap',
            headers: {
              access_token: provider.token,
              type_request: 'mobile',
            },
          }}
        />
        {addVisible || (
          <TouchableOpacity
            onPress={() => setAddVisible(true)}
            style={styles.fab}>
            <Icon color={'white'} name="add" type="ionicon" />
          </TouchableOpacity>
        )}
      </View>
      <AddIssue
        onRequestClose={() => setAddVisible(false)}
        visible={addVisible}
      />
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
