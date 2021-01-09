import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {IconLabel, Spacer, TextView} from '@components';
import {Colors, GridStyles, TextStyles} from '@resources';
import {Divider, Icon} from 'react-native-elements';

export const TaskItem: React.FC<any> = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            'https://1.bp.blogspot.com/-rt6mn1dJJ7M/XqZl2p-TboI/AAAAAAAAjO8/SzKdmwQAFhUH2CXgUH6kluj_G8Gig2-xgCLcBGAsYHQ/s1600/Anh-avatar-dep-cho-con-trai%2B%25281%2529.jpg',
        }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <View style={GridStyles.rowSpaceBetween}>
          <TextView style={TextStyles.title} text="Task1" />
          <IconLabel
            suffix={
              <Icon
                color={Colors.accent}
                name="alert-circle-outline"
                type="ionicon"
              />
            }
            color={Colors.accent}
            text="Open"
          />
        </View>
        <Spacer />
        <IconLabel
          prefix={<Icon name="person-outline" type="ionicon" />}
          text="Angela Babe"
        />
        <View style={GridStyles.rowSpaceBetween}>
          <TextView style={TextStyles.normal} text="#1111" />
          <TextView style={TextStyles.normal} text="#1111" />
          <Icon name="star-outline" type="ionicon" />
        </View>
      </View>
    </View>
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
  name: {
    fontSize: 16,
  },
});
