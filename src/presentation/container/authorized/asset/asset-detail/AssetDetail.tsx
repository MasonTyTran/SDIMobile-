import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {Header, Icon} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import {TextView} from '@components';
import {Colors} from '@resources';

import {AssetDetailProps} from './types';
import {AssetIssue} from './AssetIssue';
import {AssetInfo} from './AssetInfo';

const initialLayout = {width: Dimensions.get('window').width};
export const AssetDetail: React.FC<AssetDetailProps> = (props) => {
  const asset = props.route.params.asset;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Information', title: 'Thông tin chung'},
    {key: 'FeedBack', title: 'Sự cố'},
  ]);

  const renderScene = SceneMap({
    Information: () => <AssetInfo item={asset} />,
    FeedBack: () => <AssetIssue item={asset} />,
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
            onPress={() => props.navigation.pop()}
            color={'white'}
            type="ionicon"
            name="arrow-back"
          />
        }
        centerComponent={
          <TextView text="Chi tiết tài sản" style={styles.header} />
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
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  tabBarStyle: {backgroundColor: 'white'},
});
