import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
// import from library
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header, Icon} from 'react-native-elements';
// import from alias
import {TextView} from '@components';
import {withHotRedux} from '@hocs';
// localImport
import {IssueListProps} from './types';
import {Colors} from '@resources';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {AuthorizedStoryboardParamList} from '@storyboards';
import {FlatList} from 'react-native-gesture-handler';
import {IssueListTab} from './IssueListTab';
import {IssueDataSource} from '@data';
import {User} from '@domain';
import {useUser} from '@hooks';

const initialLayout = {width: Dimensions.get('window').width};

const OpenIssues = (
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'IssueList'>,
  user: User,
) => (
  <IssueListTab
    type="OPEN"
    getData={(index: number) =>
      IssueDataSource.listOpenIssue({
        organization_id: user.organizationID,
        user_id: user.id,
        page_num: index,
        page_size: 10,
      })
    }
    navigation={navigation}
  />
);

const ClosedIssues = (
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'IssueList'>,
  user: User,
) => (
  <IssueListTab
    type="CLOSED"
    getData={(index: number) =>
      IssueDataSource.listClosedIssue({
        organization_id: user.organizationID,
        user_id: user.id,
        page_num: index,
        page_size: 10,
      })
    }
    navigation={navigation}
  />
);

export const IssueList: React.FC<IssueListProps> = (props) => {
  const {} = props;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'OpenIssues', title: 'Chưa xử lí'},
    {key: 'ClosedIssues', title: 'Đã xử lí'},
  ]);
  const user = useUser();
  const renderScene = SceneMap({
    OpenIssues: () => OpenIssues(props.navigation, user),
    ClosedIssues: () => ClosedIssues(props.navigation, user),
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
            onPress={props.navigation.goBack}
            color={'white'}
            type="ionicon"
            name="arrow-back"
          />
        }
        centerComponent={
          <TextView text="Thông tin sự cố" style={styles.header} />
        }
        rightComponent={
          <Icon
            onPress={() => {}}
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
