import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Images} from '@assets';
import {TextView} from '../label';
import VersionInfo from 'react-native-version-info';
const version = `${VersionInfo.appVersion}.${VersionInfo.buildVersion}`;
export const Footer = ({
  color = 'white',
  hasG = false,
}: {
  color?: string;
  hasG?: boolean;
}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Images.LOGO} resizeMode="contain" />
      <TextView style={[styles.version, {color}]} text={`v${version} `} />
      {hasG && (
        <TextView
          style={[styles.g, {color}]}
          text=" -   Một nền tảng của VidaGIS"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
  },
  version: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  g: {
    color: 'white',
  },
});
