import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {SDIImage, TextView} from '@components';
import {TextStyles} from '@resources';
import {Icon} from 'react-native-elements';
import {Issue} from '@data';
import {useUser} from '@hooks';
import moment from 'moment';
export interface IssueItemProps {
  item: Issue;
  onPress: (item: Issue) => void;
  type: 'OPEN' | 'CLOSED';
}
export const IssueItem: React.FC<IssueItemProps> = ({item, onPress, type}) => {
  const isOpen = type === 'OPEN';
  const user = useUser();
  console.log(item);
  return (
    <Pressable onPress={() => onPress(item)} style={styles.container}>
      <View style={{flexDirection: 'row', marginVertical: 5}}>
        <SDIImage
          fileID={item.vidagis_images || item.vidagis_list_path_image}
          style={styles.image}
        />
        <View>
          <View style={styles.infoContainer}>
            <TextView
              style={styles.status}
              text={item.vidagis_type_incident_name}
            />
            <Icon
              color={isOpen ? 'green' : 'red'}
              type="ionicon"
              size={15}
              name={
                isOpen ? 'arrow-forward-circle-outline' : 'close-circle-outline'
              }
            />
          </View>
          <TextView style={styles.code} text={'#' + item.vidagis_incident_id} />
          <View style={[styles.infoContainer]}>
            <Icon
              color={'gray'}
              type="ionicon"
              size={15}
              name="person-outline"
              style={{marginRight: 4}}
            />
            <TextView
              style={[styles.code, {marginVertical: 0}]}
              text={user.displayName}
            />
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextView style={styles.title} text={'Tên sự kiện:'} />
        <TextView
          style={styles.normalText}
          numberOfLines={1}
          text={item.vidagis_incident_name}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextView style={styles.title} text={'Thời gian phát hiện:'} />
        <TextView
          style={styles.normalText}
          numberOfLines={1}
          text={item.incurred_incident_str}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextView style={styles.title} text={'Thời gian khắc phục:'} />
        <TextView
          style={styles.normalText}
          numberOfLines={1}
          text={!isOpen ? item.handling_incident_str : '...'}
        />
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
    backgroundColor: 'white',
    ...shadow,
  },
  image: {
    width: '30%',
    borderRadius: 4,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
  },
  code: {
    ...TextStyles.mdTitle,
    marginVertical: 5,
  },
  title: {
    ...TextStyles.mdTitle,
    marginRight: 8,
  },
  normalText: {
    ...TextStyles.normal,
    flex: 1,
  },
  status: {
    ...TextStyles.mdTitle,
    marginRight: 10,
  },
});
