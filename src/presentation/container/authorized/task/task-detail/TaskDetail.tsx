import React from 'react';
import {StyleSheet} from 'react-native';

import {Header, Icon} from 'react-native-elements';

import {TextView} from '@components';
import {Colors} from '@resources';

import {TaskDetailProps} from './types';
import {TaskInfo} from './TaskInfo';

export const TaskDetail: React.FC<TaskDetailProps> = (props) => {
  const {project} = props.route.params;

  return (
    <>
      <Header
        leftComponent={
          <Icon
            onPress={() => props.navigation.pop()}
            color={'white'}
            type="ionicon"
            name="arrow-back"
          />
        }
        centerComponent={
          <TextView text={'Chi tiết công việc'} style={styles.header} />
        }
        backgroundColor={Colors.gray}
      />
      <TaskInfo item={project} />
    </>
  );
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
