import React from 'react';
import {Alert, Pressable} from 'react-native';
import ImagePicker, {Options, Image} from 'react-native-image-crop-picker';

export const openImagePicker = (callback: (image: Image) => void) => {
  let option: Options = {
    width: 300,
    height: 400,
    mediaType: 'photo',
    forceJpg: true,
  };
  Alert.alert('Chọn ảnh từ', '', [
    {
      text: 'Camera',
      onPress: () => {
        ImagePicker.openCamera(option).then(callback);
      },
    },
    {
      text: 'Thư viện ảnh',
      onPress: () => {
        ImagePicker.openPicker(option).then(callback);
      },
    },
  ]);
};

export interface ImagePickerPlaceholderProps {
  onLoaded: (image: Image) => void;
}

export const ImagePickerPlaceholder: React.FC<ImagePickerPlaceholderProps> = ({
  onLoaded,
  children,
}) => {
  const onPress = () => {
    openImagePicker(onLoaded);
  };
  return <Pressable onPress={onPress}>{children}</Pressable>;
};
