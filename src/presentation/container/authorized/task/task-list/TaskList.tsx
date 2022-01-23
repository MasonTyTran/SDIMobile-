import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {Header, Icon} from 'react-native-elements';
import {TabView, TabBar, Route} from 'react-native-tab-view';

import {TextView} from '@components';
import {Colors} from '@resources';

import {TaskListProps} from './types';
import {useUser} from '@hooks';
import {OpenTab, InprogressTab, CompletedTab, OverdueTab} from './Components';
const initialLayout = {width: Dimensions.get('window').width};
const DFR = [
  {key: 'OpenTab', title: 'Chưa thực hiện'},
  {key: 'InprogressTab', title: 'Đang thực hiện'},
  {key: 'CompletedTab', title: 'Hoàn thành'},
  {key: 'OverdueTab', title: 'Qúa hạn'},
];
export const TaskList: React.FC<TaskListProps> = (props) => {
  const user = useUser();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([...DFR]);
  const tabLabelRef = React.useRef([...routes]);
  const setTotalRecordForTab = (key: string) => (value: number) => {
    const rIndex = tabLabelRef.current.findIndex((x) => x.key === key);
    tabLabelRef.current.splice(rIndex, 1, {
      key,
      title: `${DFR[rIndex].title} (${value})`,
    });
  };
  const renderScene = ({route}: {route: Route}) => {
    const prs = {
      navigation: props.navigation,
      user,
      setTotalRecord: setTotalRecordForTab(route.key),
    };
    switch (route.key) {
      case 'OpenTab':
        return <OpenTab {...prs} />;
      case 'InprogressTab':
        return <InprogressTab {...prs} />;
      case 'CompletedTab':
        return <CompletedTab {...prs} />;
      case 'OverdueTab':
        return <OverdueTab {...prs} />;
    }
  };

  const renderTabBar = (p: any) => (
    <TabBar
      {...p}
      getLabelText={(r) =>
        tabLabelRef.current.find((x) => x.key === r.route.key)?.title
      }
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
          <TextView text="Danh sách công việc" style={styles.header} />
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
