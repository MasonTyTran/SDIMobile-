import React from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import {Button, Icon} from 'react-native-elements';

import {IconLabel, openImagePicker, TextField} from '@components';
import {Colors, GridStyles} from '@resources';
import {Formik} from 'formik';
import {Image as ImageProps} from 'react-native-image-crop-picker';
import {CreateIssueRequest, IssueDataSource} from '@data';
import {showMessage} from 'react-native-flash-message';
import {DatePicker} from './DatePicker';
import moment from 'moment';
import {TypePicker} from './TypePicker';
export interface AddIssueProps {
  visible: boolean;
  onRequestClose: () => void;
  id: number | string;
}

export const AddIssue: React.FC<AddIssueProps> = ({
  visible,
  onRequestClose,
  id,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const createIssue = (request: CreateIssueRequest) => {
    setLoading(true);
    IssueDataSource.createIssue(request).subscribe({
      next: (res) => {
        console.warn(res);
        if (res.Code === 0) {
          showMessage({message: 'Tạo sự kiện thành công', type: 'success'});
          onRequestClose();
        } else {
          showMessage({message: 'Tạo sự kiện thất bại', type: 'warning'});
        }
      },
      error: () => {
        showMessage({message: 'Tạo sự kiện thất bại', type: 'danger'});
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
          if (!values.name || values.name.length > 50) {
            return showMessage({
              message: 'Tên sự kiện không thể bỏ trống hoặc dài hơn 50 kí tự',
            });
          }
          if (!values.type) {
            return showMessage({message: 'Loại sự kiện không thể bỏ trống'});
          }
          if (values.content.length > 100) {
            return showMessage({
              message: 'Nội dung không thể bỏ trống hoặc dài hơn 100 kí tự',
            });
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
                maxLength: 50,
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
                maxLength: 100,
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
                loading={loading}
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
