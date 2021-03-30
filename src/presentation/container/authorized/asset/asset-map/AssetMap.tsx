import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {WebView} from 'react-native-webview';
import {Header, Icon} from 'react-native-elements';

import {FullScreenLoadingIndicator, TextView} from '@components';
import {Colors} from '@resources';

import {AssetMapProps} from './types';
import {AssetSearch} from './AssetSearch';
import {container} from 'tsyringe';
import {AppDependencies} from '@di';
import {RxRemoteProvider} from '@core';
import {LocationDataSource} from '@data';

export const AssetMap: React.FC<AssetMapProps> = (props) => {
  const provider = container.resolve<RxRemoteProvider>(
    AppDependencies.ApiProvider,
  );
  const [position, setPosition] = React.useState<Geolocation.GeoPosition>();
  const [loadingPosition, setLoadingPosition] = React.useState(true);
  const getLocation = React.useCallback(async () => {
    try {
      setLoadingPosition(true);
      const granted = await LocationDataSource.requestPermission();
      if (!granted) {
        return;
      }
      const result = await LocationDataSource.getCurrentLocation();
      setPosition(result);
    } catch (error) {
      Alert.alert(
        'Error',
        'Đã xảy ra lỗi khi lấy vị trí của bạn, vui lòng thử lại sau',
      );
    } finally {
      setLoadingPosition(false);
    }
  }, []);
  React.useEffect(() => {
    getLocation();
  }, [getLocation]);
  const renderWebview = () => {
    if (loadingPosition) {
      return <FullScreenLoadingIndicator visible />;
    }
    return (
      <WebView
        style={styles.webview}
        source={{
          uri: `https://hue.aktivmap.com/GIS/MainMap/MapMobile?x=${position?.coords.latitude}&y=${position?.coords.longitude}`,
          headers: {
            access_token: provider.token,
            type_request: 'mobile',
          },
        }}
      />
    );
  };
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
          <TextView text="Mạng lưới tài sản" style={styles.header} />
        }
        backgroundColor={Colors.gray}
      />
      <View style={styles.container}>
        {renderWebview()}
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
