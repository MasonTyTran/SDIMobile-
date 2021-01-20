import React from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';

import {Button, Icon} from 'react-native-elements';

import {IconLabel, TextField} from '@components';
import {Colors, GridStyles} from '@resources';
import {Formik} from 'formik';

export interface AddIssueProps {
  visible: boolean;
  onRequestClose: () => void;
}

export const AddIssue: React.FC<AddIssueProps> = ({
  visible,
  onRequestClose,
}) => {
  const form = () => {
    return (
      <Formik
        initialValues={{
          name: '',
          location: '',
          content: '',
          time: new Date(),
        }}
        onSubmit={() => {}}>
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
              <Pressable style={styles.imageUpload}>
                <IconLabel
                  prefix={
                    <Icon color="white" type="ionicon" name="cloud-upload" />
                  }
                  color="white"
                  text="Upload image"
                />
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
