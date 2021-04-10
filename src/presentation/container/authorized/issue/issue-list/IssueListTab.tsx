import React from 'react';
import {StyleSheet, ListRenderItemInfo, View} from 'react-native';

import {Observable} from 'rxjs';
import {debounce} from 'lodash';

import {ListView} from '@components';

import {IssueItem} from './IssueItem';
import {Issue, IssueListResponse} from '@data';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {AuthorizedStoryboardParamList} from '@storyboards';

export interface IssueListTabProps {
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'IssueList'>;
  getData: (index: number) => Observable<IssueListResponse>;
  type: 'OPEN' | 'CLOSED';
}

export const IssueListTab: React.FC<IssueListTabProps> = (props) => {
  const refIndex = React.useRef(1);
  const {current: index} = refIndex;
  const [hasMore, setHasMore] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Issue[]>([]);
  const setIndex = (i: number) => (refIndex.current = i);
  const onRefresh = React.useCallback(() => {
    if (refreshing || loading) {
      return;
    }
    setRefreshing(true);
    props.getData(1).subscribe({
      next: (res) => {
        console.log('refresh', res);
        setData(res.Data.incidents);
        setIndex(1);
        setRefreshing(false);
      },
      error: () => setRefreshing(false),
    });
  }, [loading, props, refreshing]);
  const onLoadMore = () => {
    if (loading || refreshing || !hasMore) {
      return;
    }
    setLoading(true);
    props.getData(index + 1).subscribe({
      next: (res) => {
        if (res.Data.incidents.length === 0) {
          setHasMore(false);
        }
        setData((old) => [...old, ...res.Data.incidents]);
        setIndex(index + 1);
        setLoading(false);
      },
      error: () => setLoading(false),
    });
  };

  React.useEffect(onRefresh, []);

  const renderItem = ({item}: ListRenderItemInfo<Issue>) => {
    return (
      <IssueItem
        type={props.type}
        onPress={
          () => {}
          // props.navigation.navigate('IssueDetail', { project })
        }
        item={item}
      />
    );
  };
  const keyExtractor = (item: Issue) => item.oid.toString();
  return (
    <View style={styles.container}>
      <ListView
        isLoadingMore={loading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={debounce(onLoadMore, 1000)}
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
