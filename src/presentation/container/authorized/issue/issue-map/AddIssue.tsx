import React, { useState } from 'react';
import { Alert, Image, Modal, Pressable, StyleSheet, View } from 'react-native';

import { Button, Icon } from 'react-native-elements';

import { IconLabel, TextField } from '@components';
import { Colors, GridStyles } from '@resources';
import { Formik } from 'formik';
import ImagePicker, { Options, Image as ImageProps } from "react-native-image-crop-picker";


export interface AddIssueProps {
  visible: boolean;
  onRequestClose: () => void;
}

export const AddIssue: React.FC<AddIssueProps> = ({
  visible,
  onRequestClose,
}) => {
  let [image, setImage] = useState<ImageProps>({} as ImageProps)
  const form = () => {
    return (
      <Formik
        initialValues={{
          name: '',
          location: '',
          content: '',
          time: new Date(),
        }}
        onSubmit={() => { }}>
        {() => {
          return (
            <View style={styles.form}>
              <TextField
                containerStyle={styles.input}
                prefix={
                  <Icon color={Colors.gray} type="ionicon" name="warning" />
                }
                inputProps={{
                  placeholder: 'Tên sự cố',
                }}
              />
              <TextField
                containerStyle={styles.input}
                prefix={
                  <Icon color={Colors.gray} type="ionicon" name="location" />
                }
                inputProps={{
                  placeholder: 'Vị trí',
                }}
              />
              <TextField
                containerStyle={styles.input}
                prefix={
                  <Icon
                    color={Colors.gray}
                    type="ionicon"
                    name="document-text"
                  />
                }
                inputProps={{
                  placeholder: 'Nội dung',
                }}
              />
              <TextField
                containerStyle={styles.input}
                prefix={
                  <Icon color={Colors.gray} type="ionicon" name="calendar" />
                }
                inputProps={{
                  placeholder: 'Thời gian phát hiện',
                }}
              />
              <Pressable style={styles.imageUpload} onPress={() => {
                openImagePicker((image) => {
                  setImage(image)
                })
              }}>

                {!!image.path ?
                  <Image source={{ uri: image.path }} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                  : <IconLabel
                    prefix={
                      <Icon color="white" type="ionicon" name="cloud-upload" />
                    }
                    color="white"
                    text="Upload image"
                  />}
              </Pressable>
              <View style={GridStyles.row}>
                <Button
                  onPress={onRequestClose}
                  containerStyle={styles.btnCancel}
                  title="Hủy"
                  buttonStyle={{ backgroundColor: Colors.red }}
                />
                <Button
                  title="Lưu"
                  containerStyle={GridStyles.flex1}
                  buttonStyle={{
                    backgroundColor: Colors.ocean,
                  }}
                />
              </View>
            </View>
          );
        }}
      </Formik>
    );
  };
  return (
    <Modal visible={visible} animationType={'fade'} transparent>
      <View style={styles.container}>{form()}</View>
    </Modal>
  );
};


const openImagePicker = (callback: (image: any) => void) => {
  let option: Options = {
    width: 300,
    height: 400,
    mediaType: 'photo',
    forceJpg: true
  }
  Alert.alert("Chọn ảnh từ", '', [
    {
      text: 'Camera', onPress: () => {
        ImagePicker.openCamera(option).then(image => {
          callback && callback(image)

        })
      }
    },
    {
      text: 'Thư viện ảnh', onPress: () => {
        ImagePicker.openPicker(option).then(image => {
          callback && callback(image)

        })
      }
    }
  ])
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(51,51,51,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: Colors.gray,
    width: '90%',
    marginTop: 30,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  input: {
    marginBottom: 8,
  },
  imageUpload: {
    borderWidth: 2,
    borderStyle: 'dashed',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  btnCancel: {
    flex: 1,
    marginRight: 16,
  },
});
