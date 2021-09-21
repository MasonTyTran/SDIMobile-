import React from 'react';
import {StyleSheet, ListRenderItemInfo, View} from 'react-native';

import {SearchBar} from 'react-native-elements';
import {Observable} from 'rxjs';
import {debounce} from 'lodash';

import {ListView} from '@components';

import {TaskItem} from './TaskItem';
import {WOListResponse, WOProject} from '@data';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {AuthorizedStoryboardParamList, TaskState} from '@storyboards';
import {useFocusEffect} from '@react-navigation/core';

export interface TaskListTabProps {
  taskState: TaskState;
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'TaskList'>;
  getData: (keyword: string, index: number) => Observable<WOListResponse>;
}

export const TaskListTab: React.FC<TaskListTabProps> = (props) => {
  const refIndex = React.useRef(1);
  const {current: index} = refIndex;
  const [keyword, setKeyword] = React.useState('');
  const [hasMore, setHasMore] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<WOProject[]>([]);
  const setIndex = (i: number) => (refIndex.current = i);
  const onRefresh = React.useCallback(() => {
    if (refreshing || loading) {
      return;
    }
    setRefreshing(true);
    props.getData(keyword, 1).subscribe({
      next: (res) => {
        setData(res.Data.projects);
        setIndex(1);
        setRefreshing(false);
      },
      error: () => setRefreshing(false),
    });
  }, [keyword, loading, props, refreshing]);
  const onLoadMore = () => {
    if (loading || refreshing || !hasMore) {
      return;
    }
    setLoading(true);
    props.getData(keyword, index + 1).subscribe({
      next: (res) => {
        if (res.Data.projects.length === 0) {
          setHasMore(false);
        }
        setData((old) => [...old, ...res.Data.projects]);
        setIndex(index + 1);
        setLoading(false);
      },
      error: () => setLoading(false),
    });
  };

  const debounceRefresh = React.useCallback(
    debounce((k: string) => {
      if (refreshing || loading) {
        return;
      }
      setRefreshing(true);
      props.getData(k, 1).subscribe({
        next: (res) => {
          setData(res.Data.projects);
          setIndex(1);
          setRefreshing(false);
        },
        error: () => setRefreshing(false),
      });
    }, 800),
    [],
  );

  const onChangeKeyword = (t: string) => {
    setKeyword(t);
    debounceRefresh(t);
  };

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const renderItem = ({item}: ListRenderItemInfo<WOProject>) => {
    return (
      <TaskItem
        onPress={(project) =>
          props.navigation.navigate('TaskDetail', {
            project,
          })
        }
        item={item}
      />
    );
  };
  const keyExtractor = (item: WOProject) => item.oid.toString();
  return (
    <View style={styles.container}>
      <SearchBar
        platform="ios"
        value={keyword}
        onChangeText={onChangeKeyword}
      />
      <ListView
        isLoadingMore={loading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={debounce(onLoadMore, 1000)}
        emptyListViewProps={{
          content: 'Không có công việc',
          title: ' ',
        }}
      />
    </View>
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
