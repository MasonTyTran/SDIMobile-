import {Images} from '@assets';
import {BuildConfig, RxRemoteProvider} from '@core';
import {AppDependencies} from '@di';
import React from 'react';
import {Image, ImageProps, ImageSourcePropType} from 'react-native';
import {styles} from 'src/presentation/container/authorized/dashboard/Dashboard.style';
import {container} from 'tsyringe';

export interface SDIImageProps extends ImageProps {
  fileID?: string;
  source?: ImageSourcePropType;
  errorSize?: number;
}

export const SDIImage: React.FC<SDIImageProps> = (props) => {
  const {errorSize = 100, style = {}} = props;
  const [err, setErr] = React.useState<any>();
  const url = `${BuildConfig.ApiUrl}getFile/${props.fileID}`;
  const token =
    container.resolve<RxRemoteProvider>(AppDependencies.ApiProvider).token ??
    '';
  if (err) {
    return (
      <Image
        {...props}
        style={[{height: errorSize, width: errorSize}, style]}
        source={Images.PLACEHOLDER}
        resizeMode="center"
      />
    );
  }
  return (
    <Image
      {...props}
      source={{
        uri: url,
        headers: {
          access_token: token,
        },
      }}
      resizeMode="center"
      defaultSource={Images.PLACEHOLDER}
      onError={setErr}
    />
  );
};
