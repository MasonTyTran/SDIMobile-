import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {WebView} from 'react-native-webview';
import {Header, Icon} from 'react-native-elements';

import {FullScreenLoadingIndicator, TextView} from '@components';
import {Colors} from '@resources';

import {AssetMapProps} from './types';
import {container} from 'tsyringe';
import {AppDependencies} from '@di';
import {RxRemoteProvider} from '@core';
import {IssueDataSource, LocationDataSource} from '@data';
import {useUser} from '@hooks';

export const AssetMap: React.FC<AssetMapProps> = (props) => {
  const {navigation} = props;
  const user = useUser();
  const provider = container.resolve<RxRemoteProvider>(
    AppDependencies.ApiProvider,
  );
  const [endPoint, setEndPoint] = React.useState<string>();
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
  const getEndPoint = React.useCallback(async () => {
    const data = await IssueDataSource.getOrganizationInfo(
      user.organizationID,
    ).toPromise();
    console.warn(data);

    setEndPoint(data.vidagis_url_map_mobile);
  }, [user.organizationID]);
  React.useEffect(() => {
    getLocation();
    getEndPoint();
  }, [getEndPoint, getLocation]);
  const renderWebview = () => {
    if (loadingPosition || !endPoint) {
      return <FullScreenLoadingIndicator visible />;
    }

    return (
      <WebView
        style={styles.webview}
        source={{
          uri: `${endPoint}GIS/MainMap/MapMobile?x=${position?.coords.latitude}&y=${position?.coords.longitude}`,
          headers: {
            access_token: provider.token,
            type_request: 'mobile',
          },
        }}
        ignoreSslError
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
        rightComponent={
          <Icon
            color="#fff"
            onPress={() => navigation.navigate('AssetList')}
            type="ionicon"
            name="search-outline"
          />
        }
        backgroundColor={Colors.gray}
      />
      <View style={styles.container}>{renderWebview()}</View>
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
