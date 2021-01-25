import {BuildConfig} from '@core';
import React from 'react';
import {Image, ImageProps, ImageSourcePropType} from 'react-native';

export interface SDIImageProps extends ImageProps {
  fileID?: string;
  source?: ImageSourcePropType;
}

export const SDIImage: React.FC<SDIImageProps> = (props) => {
  const url = props.fileID
    ? `${BuildConfig.ApiUrl}/getFile/${props.fileID}`
    : 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png';
  return <Image {...props} source={{uri: url}} />;
};
