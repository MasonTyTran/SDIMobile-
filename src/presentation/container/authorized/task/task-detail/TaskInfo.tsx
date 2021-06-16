import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Icon} from 'react-native-elements';

import {
  FullScreenLoadingIndicator,
  IconLabel,
  SDIImage,
  TextView,
} from '@components';
import {Colors, GridStyles, TextStyles} from '@resources';

import {TaskInfoProps} from './types';
import {DateTimeBox, InfoBox} from './common';
import {useTaskInfo} from './useTaskInfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const TaskInfo: React.FC<TaskInfoProps> = ({item, taskState}) => {
  const {
    setEndDate,
    setStartDate,
    setPerson,
    setCompletedTime,
    completedTime,
    startDate,
    endDate,
    person,
    loading,
    complete,
    previous,
    forward,
  } = useTaskInfo(item);
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <FullScreenLoadingIndicator visible={loading} />
      <TextView style={styles.title} text="Thông tin chung" />

      <View style={styles.infoContainer}>
        <View style={GridStyles.row}>
          <View style={styles.info}>
            <TextView style={styles.id} text={`#${item.oid}`} />
            <TextView style={styles.id} text={item.vidagis_name} />
            <TextView
              style={styles.id}
              text={`Priority: ${item.vidagis_prioritize_des}`}
            />
          </View>
          <IconLabel
            suffix={
              <Icon
                color={Colors.accent}
                name="alert-circle-outline"
                type="ionicon"
              />
            }
            color={Colors.accent}
            text={item.vidagis_status_des}
          />
          <SDIImage fileID={item.vidagis_avatar} style={styles.image} />
        </View>
      </View>
      <Divider style={styles.divider} />
      <TextView style={styles.title} text="Thông tin task" />
      <InfoBox
        onChangeText={setPerson}
        label="Người thực hiện"
        value={person}
      />
      <DateTimeBox
        onChangeDate={setStartDate}
        label="Thời gian bắt đầu"
        value={startDate}
      />
      <DateTimeBox
        onChangeDate={setEndDate}
        label="Thời gian kết thúc"
        value={endDate}
      />
      <InfoBox
        onChangeText={setCompletedTime}
        label="Số giờ hoàn thành"
        value={completedTime}
      />
      {item.is_update && (
        <View style={styles.buttonContainer}>
          {item.is_back_forward && (
            <IconLabel
              onPress={previous}
              prefix={
                <Icon
                  color={Colors.gray}
                  name="play-skip-back"
                  type="ionicon"
                />
              }
              color={Colors.gray}
              text="TRẢ LẠI"
            />
          )}
          {item.is_complete && (
            <IconLabel
              onPress={complete}
              prefix={
                <Icon
                  color={Colors.gray}
                  name="checkmark-done-circle"
                  type="ionicon"
                />
              }
              color={Colors.gray}
              text="HOÀN THÀNH"
            />
          )}
          {item.is_forward && (
            <IconLabel
              onPress={forward}
              prefix={
                <Icon color={Colors.gray} name="arrow-forward" type="ionicon" />
              }
              color={Colors.gray}
              text="Bước tiếp theo"
            />
          )}
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    ...TextStyles.title,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  info: {
    flex: 1,
  },
  id: {
    ...TextStyles.normal,
    marginBottom: 8,
  },
  image: {
    width: '30%',
    height: 50,
  },
  infoBox: {
    marginTop: 16,
    borderWidth: 2,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 12,
  },
  infoBoxLabel: {
    position: 'absolute',
    top: -10,
    left: 8,
    backgroundColor: 'white',
  },
  infoBoxValue: {
    ...TextStyles.normal,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    letterSpacing: 10,
    marginTop: 30,
  },
  divider: {
    marginVertical: 30,
  },
});
