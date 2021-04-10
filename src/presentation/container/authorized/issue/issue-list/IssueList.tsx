import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
// import from library
import {Header, Icon} from 'react-native-elements';
// import from alias
import {TextView} from '@components';
// localImport
import {IssueListProps} from './types';
import {Colors} from '@resources';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {AuthorizedStoryboardParamList} from '@storyboards';
import {IssueListTab} from './IssueListTab';
import {IssueDataSource} from '@data';

const initialLayout = {width: Dimensions.get('window').width};

const OpenIssues = (
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'IssueList'>,
  id: string,
  tableId: string,
) => (
  <IssueListTab
    type="OPEN"
    getData={(index: number) =>
      IssueDataSource.listOpenIssue({
        vidagis_id: id,
        vidagis_tableid: tableId,
        page_num: index,
        page_size: 10,
      })
    }
    navigation={navigation}
  />
);

const ClosedIssues = (
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'IssueList'>,
  id: string,
  tableId: string,
) => (
  <IssueListTab
    type="CLOSED"
    getData={(index: number) =>
      IssueDataSource.listClosedIssue({
        vidagis_id: id,
        vidagis_tableid: tableId,
        page_num: index,
        page_size: 10,
      })
    }
    navigation={navigation}
  />
);

export const IssueList: React.FC<IssueListProps> = (props) => {
  const {
    route: {
      params: {id = '', tableId = ''},
    },
  } = props;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'OpenIssues', title: 'Chưa xử lí'},
    {key: 'ClosedIssues', title: 'Đã xử lí'},
  ]);
  const renderScene = SceneMap({
    OpenIssues: () => OpenIssues(props.navigation, id, tableId),
    ClosedIssues: () => ClosedIssues(props.navigation, id, tableId),
  });

  const renderTabBar = (p: any) => (
    <TabBar
      {...p}
      indicatorStyle={{backgroundColor: Colors.gray}}
      style={styles.tabBarStyle}
      labelStyle={{color: Colors.gray}}
    />
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
          <TextView text="Thông tin sự cố" style={styles.header} />
        }
        rightComponent={
          <Icon
            onPress={() => {
              props.navigation.navigate('IssueSearchResult');
            }}
            color={'white'}
            type="ionicon"
            iconStyle={{transform: [{rotateY: '180deg'}]}}
            name="search-outline"
          />
        }
        backgroundColor={Colors.gray}
      />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  tabBarStyle: {backgroundColor: 'white'},
});
