import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';

import {IconLabel, SDIImage, Spacer, TextView} from '@components';
import {Colors, GridStyles, TextStyles} from '@resources';
import {Icon} from 'react-native-elements';
import {WOProject} from '@data';
export interface TaskItemProps {
  item: WOProject;
  onPress: (item: WOProject) => void;
}
export const TaskItem: React.FC<TaskItemProps> = ({item, onPress}) => {
  return (
    <Pressable onPress={() => onPress(item)} style={styles.container}>
      <SDIImage fileID={item.vidagis_avatar} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <TextView style={styles.title} text={item.vidagis_name} />
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
        </View>
        <Spacer />
        <IconLabel
          prefix={<Icon name="person-outline" type="ionicon" />}
          text={`${item.leader_name}`}
        />
        <View style={GridStyles.rowSpaceBetween}>
          <TextView style={TextStyles.normal} text={`#${item.oid}`} />
          <TextView
            style={TextStyles.normal}
            text={`${item.vidagis_startdate_str}`}
          />
          <Icon name="star-outline" type="ionicon" />
        </View>
      </View>
    </Pressable>
  );
};

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 8,
    flexDirection: 'row',
    backgroundColor: 'white',
    ...shadow,
  },
  image: {
    width: '30%',
    borderRadius: 4,
  },
  infoContainer: {
    flex: 1,
    paddingStart: 8,
  },
  nameRow: {
    flexDirection: 'row',
  },
  title: {
    ...TextStyles.title,
    flex: 1,
    marginRight: 8,
  },
});
