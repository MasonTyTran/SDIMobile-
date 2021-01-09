import React from 'react';
import {StyleSheet, ListRenderItemInfo, View} from 'react-native';

import {Header, Icon, SearchBar} from 'react-native-elements';

import {ListView, TextView} from '@components';
import {Colors} from '@resources';

import {TaskListProps} from './types';
import {TaskItem} from './TaskItem';

export const TaskList: React.FC<TaskListProps> = (props) => {
  const renderItem = ({item}: ListRenderItemInfo<number>) => {
    return <TaskItem item={item} />;
  };
  const keyExtractor = (item) => item.toString();
  return (
    <>
      <Header
        leftComponent={
          <Icon
            onPress={props.navigation.openDrawer}
            color={'white'}
            type="ionicon"
            name="menu"
          />
        }
        centerComponent={<TextView text="Task List" style={styles.header} />}
        backgroundColor={Colors.gray}
      />
      <SearchBar platform="ios" />
      <ListView
        data={[1, 2, 3, 4]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});
