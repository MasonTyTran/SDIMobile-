import React from 'react';
import {StyleSheet, View} from 'react-native';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {HSpacer} from '@components';

export const NotificationItem: React.FC = () => {
  const {navigate} = useNavigation<
    NavigationProp<AuthorizedStoryboardParamList, 'Dashboard'>
  >();
  const onPress = () => navigate('NotificationList');
  return (
    <Icon
      onPress={onPress}
      color="white"
      type="ionicon"
      name="notifications-outline"
    />
  );
};

export const NotificationAction: React.FC = ({children}) => {
  return (
    <View style={styles.row}>
      <NotificationItem />
      <HSpacer />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
