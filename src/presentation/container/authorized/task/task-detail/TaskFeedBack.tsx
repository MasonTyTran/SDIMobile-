import React from 'react';
import {StyleSheet} from 'react-native';

import {TaskFeedBackProps} from './types';

export const TaskFeedBack: React.FC<TaskFeedBackProps> = (props) => {
  return <></>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  tabBarStyle: {backgroundColor: 'white'},
});
