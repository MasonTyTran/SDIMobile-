import React from 'react';
import {ListRenderItemInfo, StyleSheet} from 'react-native';

import {Header, Icon, ListItem} from 'react-native-elements';

import {ListView, SDIImage, TextView} from '@components';
import {Colors} from '@resources';

import {NotificationListProps} from './types';
import {Notification, NotificationDataSource} from '@data';
import {debounce} from 'lodash';
import {useItem} from './useItem';

export const NotificationList: React.FC<NotificationListProps> = (props) => {
  const indexRef = React.useRef(1);
  const [data, setData] = React.useState<Notification[]>([]);
  const [refreshing, setRefreshing] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [hasMore, setHasMore] = React.useState(true);
  const {getItemDetail} = useItem();
  const refresh = React.useCallback(() => {
    setRefreshing(true);
    NotificationDataSource.listNotification({
      page_num: 1,
      page_size: 10,
    }).subscribe({
      next: ({Data: {notifications}}) => {
        console.log(notifications);
        setRefreshing(false);
        setData(notifications);
        indexRef.current = 1;
        setHasMore(notifications.length === 10);
      },
      error: () => setRefreshing(false),
    });
  }, []);
  const loadMore = React.useCallback(
    debounce(() => {
      if (loading || refreshing || !hasMore) {
        return;
      }
      setLoading(true);
      NotificationDataSource.listNotification({
        page_num: indexRef.current + 1,
        page_size: 10,
      }).subscribe({
        next: ({Data: {notifications}}) => {
          setData((old) => [...old, ...notifications]);
          indexRef.current += 1;
          setHasMore(notifications.length === 10);
        },
        complete: () => setLoading(false),
        error: console.log,
      });
    }, 800),
    [loading, refreshing],
  );

  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<Notification>) => {
      return (
        <ListItem
          onPress={() => getItemDetail(item.type, item.code)}
          bottomDivider>
          <SDIImage fileID={item.avatar_user} style={styles.avatar} />
          <ListItem.Content>
            <ListItem.Title>{item.from_user}</ListItem.Title>
            <ListItem.Subtitle>{item.createdate}</ListItem.Subtitle>
            <ListItem.Subtitle>{item.message}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    },
    [getItemDetail],
  );
  React.useEffect(refresh, []);
  const keyExtractor = React.useCallback(
    (item: Notification) => item.notifications_id,
    [],
  );
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
        centerComponent={
          <TextView text="Danh sách thông báo" style={styles.header} />
        }
        rightComponent={
          <Icon
            color="#fff"
            onPress={() => props.navigation.navigate('AssetList')}
            type="ionicon"
            name="search-outline"
          />
        }
        backgroundColor={Colors.gray}
      />
      <ListView
        refreshing={refreshing}
        isLoadingMore={loading}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onRefresh={refresh}
        onEndReached={loadMore}
      />
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.gray,
  },
});
