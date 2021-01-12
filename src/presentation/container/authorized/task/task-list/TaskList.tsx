import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {Header, Icon} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import {TextView} from '@components';
import {Colors} from '@resources';

import {TaskListProps} from './types';
import {TaskListTab} from './TasklistTab';
import {WODataSource} from '@data';
import {AuthorizedStoryboardParamList} from '@storyboards';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const OpenTab = (
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'TaskList'>,
) => (
  <TaskListTab
    getData={(keyword, i) =>
      WODataSource.listOpenTask({
        keyword,
        page_num: i,
        page_size: 10,
        organization_id: 'sdi_hue',
        user_id: '2',
      })
    }
    navigation={navigation}
  />
);

const InprogressTab = (
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'TaskList'>,
) => (
  <TaskListTab
    getData={(keyword, i) =>
      WODataSource.listInProgressTask({
        keyword,
        page_num: i,
        page_size: 10,
        organization_id: 'sdi_hue',
        user_id: '2',
      })
    }
    navigation={navigation}
  />
);

const CompletedTab = (
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'TaskList'>,
) => (
  <TaskListTab
    getData={(keyword, i) =>
      WODataSource.listCompletedTask({
        keyword,
        page_num: i,
        page_size: 10,
        organization_id: 'sdi_hue',
        user_id: '2',
      })
    }
    navigation={navigation}
  />
);
const OverdueTab = (
  navigation: DrawerNavigationProp<AuthorizedStoryboardParamList, 'TaskList'>,
) => (
  <TaskListTab
    getData={(keyword, i) =>
      WODataSource.listOverdueTask({
        keyword,
        page_num: i,
        page_size: 10,
        organization_id: 'sdi_hue',
        user_id: '2',
      })
    }
    navigation={navigation}
  />
);

const initialLayout = {width: Dimensions.get('window').width};

export const TaskList: React.FC<TaskListProps> = (props) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'OpenTab', title: 'Open'},
    {key: 'InprogressTab', title: 'Inprogress'},
    {key: 'CompletedTab', title: 'Completed'},
    {key: 'OverdueTab', title: 'Overdue'},
  ]);

  const renderScene = SceneMap({
    OpenTab: () => OpenTab(props.navigation),
    InprogressTab: () => InprogressTab(props.navigation),
    CompletedTab: () => CompletedTab(props.navigation),
    OverdueTab: () => OverdueTab(props.navigation),
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
        centerComponent={<TextView text="Task List" style={styles.header} />}
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

export const styles = StyleSheet.create({
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
