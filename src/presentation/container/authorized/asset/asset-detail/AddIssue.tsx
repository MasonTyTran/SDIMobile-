import React from 'react';
import {
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import {Button, Icon} from 'react-native-elements';

import {IconLabel, TextField} from '@components';
import {Colors, GridStyles} from '@resources';
import {Formik} from 'formik';
import ImagePicker, {
  Options,
  Image as ImageProps,
} from 'react-native-image-crop-picker';
import {CreateIssueRequest, IssueDataSource} from '@data';
import {showMessage} from 'react-native-flash-message';
import {DatePicker} from './DatePicker';
import moment from 'moment';
import {TypePicker} from './TypePicker';
export interface AddIssueProps {
  visible: boolean;
  onRequestClose: () => void;
  id: number | string;
  setLoading: (values: boolean) => void;
}

export const AddIssue: React.FC<AddIssueProps> = ({
  visible,
  onRequestClose,
  id,
  setLoading,
}) => {
  const createIssue = (request: CreateIssueRequest) => {
    setLoading(true);
    IssueDataSource.createIssue(request).subscribe({
      next: (res) => {
        if (res.Data) {
          showMessage({message: 'Thành công', type: 'success'});
          onRequestClose();
        } else {
          showMessage({message: 'Thất bại', type: 'warning'});
        }
      },
      error: (err) => {
        console.log('000err', err);
        showMessage({message: 'Thất bại', type: 'warning'});
      },
      complete: () => setLoading(false),
    });
  };

  const form = () => {
    return (
      <Formik<{
        name: string;
        content: string;
        image?: ImageProps;
        date?: Date;
        hDate?: Date;
        type?: string;
      }>
        initialValues={{
          name: '',
          content: '',
          type: '',
          image: undefined,
          date: undefined,
          hDate: undefined,
        }}
        onSubmit={(values) => {
          if (!values.date) {
            return showMessage({message: 'Ngày phát sinh không thể bỏ trống'});
          }
          if (!values.name) {
            return showMessage({message: 'Tên sự kiện không thể bỏ trống'});
          }
          if (!values.content) {
            return showMessage({message: 'Lí do không thể bỏ trống'});
          }
          if (!values.type) {
            return showMessage({message: 'Loại sự kiện không thể bỏ trống'});
          }
          let image;
          if (values.image) {
            image = {
              uri: Platform.select({
                ios: values.image.sourceURL,
                default: values.image.path,
              }),
              type: values.image.mime,
              name: Platform.select({
                ios: values.image.filename,
                default: 'image.png',
              }),
            };
          }
          createIssue({
            vidagis_id: id,
            vidagis_incident_name: values.name,
            vidagis_incurred_incident: moment(values.date).format(
              'DD/MM/YYYY HH:mm',
            ),
            vidagis_reason_incident: values.content,
            vidagis_type_incident: values.type,
            file: image,
            vidagis_handling_incident: values.hDate
              ? moment(values.hDate).format('DD/MM/YYYY HH:mm')
              : undefined,
          });
        }}>
        {({values, setFieldValue, submitForm}) => (
          <View style={styles.form}>
            <TextField
              containerStyle={styles.input}
              prefix={
                <Icon color={Colors.gray} type="ionicon" name="warning" />
              }
              inputProps={{
                placeholder: 'Tên sự kiện',
                value: values.name,
                onChangeText: (text) => {
                  setFieldValue('name', text, false);
                },
              }}
            />

            <TextField
              containerStyle={styles.input}
              prefix={
                <Icon color={Colors.gray} type="ionicon" name="document-text" />
              }
              inputProps={{
                placeholder: 'Nội dung',
                value: values.content,
                onChangeText: (text) => {
                  setFieldValue('content', text, false);
                },
              }}
            />
            <TypePicker
              value={values.type}
              onChange={(v) => setFieldValue('type', v)}
            />

            <DatePicker
              date={values.date}
              onChange={(date) => setFieldValue('date', date)}
              placeholder="Thời gian phát hiện"
            />
            <DatePicker
              date={values.hDate}
              onChange={(date) => setFieldValue('hDate', date)}
              placeholder="Thời gian xử lí"
            />
            <Pressable
              style={styles.imageUpload}
              onPress={() => {
                openImagePicker((image) => {
                  console.warn(image);
                  setFieldValue('image', image);
                });
              }}>
              {values.image?.path ? (
                <Image
                  source={{uri: values.image.path}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="contain"
                />
              ) : (
                <IconLabel
                  onPress={() => {
                    openImagePicker((image) => {
                      setFieldValue('image', image);
                    });
                  }}
                  prefix={
                    <Icon color="white" type="ionicon" name="cloud-upload" />
                  }
                  color="white"
                  text="Upload image"
                />
              )}
            </Pressable>
            <View style={GridStyles.row}>
              <Button
                onPress={onRequestClose}
                containerStyle={styles.btnCancel}
                title="Hủy"
                buttonStyle={{backgroundColor: Colors.red}}
              />
              <Button
                title="Lưu"
                onPress={submitForm}
                containerStyle={GridStyles.flex1}
                buttonStyle={{
                  backgroundColor: Colors.ocean,
                }}
              />
            </View>
          </View>
        )}
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
  datePickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 40,
  },
});
