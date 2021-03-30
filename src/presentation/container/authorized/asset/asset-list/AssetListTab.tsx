import React from 'react';
import {StyleSheet, ListRenderItemInfo, View} from 'react-native';

import {SearchBar} from 'react-native-elements';
import {debounce} from 'lodash';

import {ListView} from '@components';

import {AssetItem} from './AssetItem';
import {Asset, AssetDataSource} from '@data';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {AuthorizedStoryboardParamList} from '@storyboards';
import {useUser} from '@hooks';
import {User} from '@domain';

export interface AssetListTabProps {
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'AssetList'>;
}

const getData = (keyword: string, index: number, user: User) =>
  AssetDataSource.listAsset({
    keyword,
    organization_id: user.organizationID,
    user_id: user.id,
    page_num: index,
    page_size: 10,
  });
export const AssetListTab: React.FC<AssetListTabProps> = (props) => {
  const user = useUser();

  const refIndex = React.useRef(1);
  const {current: index} = refIndex;
  const [keyword, setKeyword] = React.useState('cx');
  const [hasMore, setHasMore] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Asset[]>([]);
  const setIndex = (i: number) => (refIndex.current = i);

  const onRefresh = React.useCallback(() => {
    if (refreshing || loading) {
      return;
    }
    setRefreshing(true);
    getData(keyword, index, user).subscribe({
      next: (res) => {
        console.log('refresh', res);
        setData(res.Data.assets);
        setIndex(1);
        setRefreshing(false);
      },
      error: () => setRefreshing(false),
    });
  }, [index, keyword, loading, refreshing, user]);
  const onLoadMore = () => {
    if (data.length === 0 || loading || refreshing || !hasMore) {
      return;
    }
    setLoading(true);
    getData(keyword, index + 1, user).subscribe({
      next: (res) => {
        if (res.Data.assets.length === 0) {
          setHasMore(false);
        }
        setData((old) => [...old, ...res.Data.assets]);
        setIndex(index + 1);
        setLoading(false);
      },
      error: () => setLoading(false),
    });
  };

  const onChangeKeyword = (t: string) => {
    setKeyword(t);
    onRefresh();
  };

  React.useEffect(onRefresh, []);

  const renderItem = ({item}: ListRenderItemInfo<Asset>) => {
    return (
      <AssetItem
        onPress={(asset) => props.navigation.navigate('AssetDetail', {asset})}
        item={item}
      />
    );
  };
  const keyExtractor = (item: Asset) => item.id;
  return (
    <View style={styles.container}>
      <SearchBar
        platform="ios"
        value={keyword}
        onChangeText={onChangeKeyword}
      />
      <View onStartShouldSetResponder={(e) => e.target}>

      </View>
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
