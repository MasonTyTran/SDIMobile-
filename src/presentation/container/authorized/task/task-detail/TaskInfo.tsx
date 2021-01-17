import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Divider, Icon} from 'react-native-elements';

import {FullScreenLoadingIndicator, IconLabel, TextView} from '@components';
import {Colors, GridStyles, TextStyles} from '@resources';

import {TaskInfoProps} from './types';
import {DateTimeBox, InfoBox} from './common';
import {useTaskInfo} from './useTaskInfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const TaskInfo: React.FC<TaskInfoProps> = ({item}) => {
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
  } = useTaskInfo(item);
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <FullScreenLoadingIndicator visible={loading} />
      <TextView style={styles.title} text="Information" />

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
          <Image
            source={{
              uri:
                'https://1.bp.blogspot.com/-rt6mn1dJJ7M/XqZl2p-TboI/AAAAAAAAjO8/SzKdmwQAFhUH2CXgUH6kluj_G8Gig2-xgCLcBGAsYHQ/s1600/Anh-avatar-dep-cho-con-trai%2B%25281%2529.jpg',
            }}
            style={styles.image}
          />
        </View>
      </View>
      <Divider style={styles.divider} />
      <TextView style={styles.title} text="Information" />
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
      <View style={styles.buttonContainer}>
        <IconLabel
          onPress={previous}
          prefix={
            <Icon color={Colors.gray} name="play-skip-back" type="ionicon" />
          }
          color={Colors.gray}
          text="TRẢ LẠI"
        />
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
      </View>
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
    letterSpacing: 10,
    marginTop: 30,
  },
  divider: {
    marginVertical: 30,
  },
});
