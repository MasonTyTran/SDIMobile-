import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

class _LocationDataSource {
  async requestPermission(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      const result = await Geolocation.requestAuthorization('whenInUse');
      return result === 'granted';
    }
    const result = await PermissionsAndroid.request(
      'android.permission.ACCESS_COARSE_LOCATION',
    );
    return result === 'granted';
  }
  getCurrentLocation(): Promise<Geolocation.GeoPosition> {
    return new Promise<Geolocation.GeoPosition>((res, rej) => {
      Geolocation.getCurrentPosition(
        (position) => {
          res(position);
        },
        (error) => {
          rej(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  }
}

export const LocationDataSource = new _LocationDataSource();
