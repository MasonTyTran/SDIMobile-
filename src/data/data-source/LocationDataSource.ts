import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Observable, ReplaySubject} from 'rxjs';

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
  trackLocation(): Observable<Geolocation.GeoPosition> {
    const subject = new ReplaySubject<Geolocation.GeoPosition>();
    Geolocation.watchPosition((position) => {
      subject.next(position);
    }, subject.error);
    return subject;
  }
}

export const LocationDataSource = new _LocationDataSource();
