import {FullScreenLoadingIndicator, TextView} from '@components';
import {RxRemoteProvider} from '@core';
import {AppDependencies} from '@di';
import {Colors} from '@resources';
import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import {Alert, StyleSheet} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {WebView} from 'react-native-webview';
import {container} from 'tsyringe';
import {IssueMapProps} from './types';
import {LocationDataSource} from '@data';

export const IssueMap: React.FC<IssueMapProps> = (props) => {
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
      console.log(result);
      setPosition(result);
    } catch (error) {
      console.log(error);
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
          <TextView text="Mạng lưới sự kiện" style={styles.header} />
        }
        backgroundColor={Colors.gray}
      />
      {renderWebview()}
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
