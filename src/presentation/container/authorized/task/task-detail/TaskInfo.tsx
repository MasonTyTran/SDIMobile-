import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Divider, Icon, Button} from 'react-native-elements';

import {IconLabel, TextView} from '@components';
import {Colors, GridStyles, TextStyles} from '@resources';

import {TaskInfoProps} from './types';

const InfoBox = ({label, value}: {label: string; value: string}) => (
  <View style={styles.infoBox}>
    <TextView style={styles.infoBoxLabel} text={label} />
    <TextView style={styles.infoBoxValue} text={value} />
  </View>
);

export const TaskInfo: React.FC<TaskInfoProps> = ({item}) => {
  return (
    <View style={styles.container}>
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
      <InfoBox label="Người thực hiện" value={item.leader_name} />
      <InfoBox label="Thời gian bắt đầu" value={item.vidagis_startdate_str} />
      <InfoBox label="Thời gian kết thúc" value={item.vidagis_enddate_str} />
      <InfoBox label="Số giờ hoàn thành" value={item.vidagis_status_des} />
      <View style={styles.buttonContainer}>
        <IconLabel
          prefix={
            <Icon color={Colors.gray} name="play-skip-back" type="ionicon" />
          }
          color={Colors.gray}
          text="TRẢ LẠI"
        />
        <IconLabel
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
    </View>
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
