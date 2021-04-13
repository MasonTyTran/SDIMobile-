import React, { useMemo } from 'react';
import { StyleSheet, ListRenderItemInfo, View } from 'react-native';

import { SearchBar, Header, Icon } from 'react-native-elements';
import { Observable } from 'rxjs';
import { debounce } from 'lodash';

import { ListView, TextView } from '@components';

import { SearchItem } from './SearchItem';
import { Issue, IssueDataSource, IssueListResponse, } from '@data';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { AuthorizedStoryboardParamList } from '@storyboards';
import { IssueSearchResultProps } from './type';
import { Colors } from '@resources';
import { useUser } from '@hooks';


export const IssueSearchResult: React.FC<IssueSearchResultProps> = (props) => {
    const refIndex = React.useRef(1);
    const { current: index } = refIndex;
    const user = useUser();
    const [hasMore, setHasMore] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState<Issue[]>([]);
    const [keyword, setKeyword] = React.useState('');
    const onChangeKeyword = (t: string) => {
        setKeyword(t);
        if (!!t) {
            onRefresh(t);
        }
        else {
            setData([]);
            setIndex(1);
        }
    };
    const setIndex = (i: number) => (refIndex.current = i);
    const onRefresh = React.useCallback((searchText?: string) => {
        if (refreshing || loading) {
            return;
        }
        setRefreshing(true);
        IssueDataSource.searchIssue({
            keyword: searchText || keyword,
            organization_id: user.organizationID,
            user_id: user.id,
            page_num: index,
            page_size: 10,
        }).subscribe({
            next: (res) => {
                console.log('refresh', res);
                setData(res.Data.incidents);
                setIndex(1);
                setRefreshing(false);
            },
            error: () => setRefreshing(false),
        });
    }, [loading, props, refreshing, keyword]);
    const onLoadMore = () => {
        // if (loading || refreshing || !hasMore) {
        //     return;
        // }
        // setLoading(true);
        // IssueDataSource.searchIssue({
        //     keyword,
        //     organization_id: user.organizationID,
        //     user_id: user.id,
        //     page_num: index,
        //     page_size: 10,
        // }).subscribe({
        //     next: (res) => {
        //         if (res.Data.incidents.length === 0) {
        //             setHasMore(false);
        //         }
        //         setData((old) => [...old, ...res.Data.incidents]);
        //         setIndex(index + 1);
        //         setLoading(false);
        //     },
        //     error: () => setLoading(false),
        // });
    };
    const renderItem = ({ item }: ListRenderItemInfo<Issue>) => {
        return (
            <SearchItem
                onPress={() => { }
                    // props.navigation.navigate('IssueDetail', { project })
                }
                item={item}
            />
        );
    };
    const keyExtractor = (item: Issue) => item.oid.toString();
    return (
        <View style={styles.container}>
            <Header
                leftComponent={
                    <Icon
                        onPress={props.navigation.goBack}
                        color={'white'}
                        type="ionicon"
                        name="arrow-back"
                    />
                }
                centerComponent={
                    <TextView text="Tìm kiếm sự kiện" style={styles.header} />
                }
                backgroundColor={Colors.gray}
            />
            {useMemo(() => {
                return (
                    <SearchBar
                        platform="ios"
                        value={keyword}
                        onChangeText={onChangeKeyword}
                    />
                )
            }, [keyword])}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
});
