import React, {useState} from 'react';
import {Alert, Image, Modal, Pressable, StyleSheet, View} from 'react-native';

import {Button, Icon} from 'react-native-elements';

import {IconLabel, TextField, TextView} from '@components';
import {Colors, GridStyles} from '@resources';
import {Formik} from 'formik';
import ImagePicker, {
  Options,
  Image as ImageProps,
} from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {IssueDataSource} from '@data';
import {useUser} from '@hooks';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
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
  let [image, setImage] = useState<ImageProps>({} as ImageProps);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const user = useUser();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setDate(date);
    hideDatePicker();
  };

  const createIssue = ({name, content}: {name: string; content: string}) => {
    IssueDataSource.createIssue({
      vidagis_handling_incident: '',
      vidagis_id: id,
      vidagis_incident_name: name,
      vidagis_incurred_incident: moment(date).format('DD/MM/YYYY HH:mm'),
      vidagis_oranizationid: user.organizationID,
      vidagis_reason_incident: content,
      vidagis_status: 0,
      vidagis_type_incident: 0,
      vidagis_userid: user.id,
    }).subscribe({
      next: (res) => {
        onRequestClose();
        setImage({} as ImageProps);
        setDate(new Date());
      },
      error: (err) => {
        console.log('000err', err);
      },
    });
  };

  const form = () => {
    return (
      <Formik
        initialValues={{
          name: '',
          // location: '',
          content: '',
        }}
        onSubmit={(values) => {
          createIssue(values);
        }}>
        {({values, setFieldValue, submitForm}) => (
          <View style={styles.form}>
            <TextField
              containerStyle={styles.input}
              prefix={
                <Icon color={Colors.gray} type="ionicon" name="warning" />
              }
              inputProps={{
                placeholder: 'Tên sự cố',
                value: values.name,
                onChangeText: (text) => {
                  setFieldValue('name', text, false);
                },
              }}
            />
            {/* <TextField
                containerStyle={styles.input}
                prefix={
                  <Icon color={Colors.gray} type="ionicon" name="location" />
                }
                inputProps={{
                  placeholder: 'Vị trí',
                }}
              /> */}
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
            <Pressable
              style={styles.datePickerContainer}
              onPress={showDatePicker}>
              <Icon color={Colors.gray} type="ionicon" name="calendar" />
              <TextView
                style={{
                  flex: 1,
                  paddingHorizontal: 8,
                }}
                text={
                  !!date
                    ? moment(date).format('DD/MM/YYYY HH:mm')
                    : `Thời gian phát hiện`
                }
              />
            </Pressable>
            <Pressable
              style={styles.imageUpload}
              onPress={() => {
                openImagePicker((image) => {
                  setImage(image);
                });
              }}>
              {!!image.path ? (
                <Image
                  source={{uri: image.path}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="contain"
                />
              ) : (
                <IconLabel
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
            <DateTimePickerModal
              minimumDate={new Date()}
              isVisible={isDatePickerVisible}
              date={date}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
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
        ImagePicker.openCamera(option).then((image) => {
          callback && callback(image);
        });
      },
    },
    {
      text: 'Thư viện ảnh',
      onPress: () => {
        ImagePicker.openPicker(option).then((image) => {
          callback && callback(image);
        });
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
