import {
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Selector, useSelector} from 'react-redux';
import {TextView} from '../component/label';
import {Colors} from '../resource/values';
import {RootStoreState} from '@shared-state';
import {AuthorizedStoryboardParamList} from '../storyboard/Authorized.storyboard';
import {User} from '@domain';

export const drawerSelector: Selector<RootStoreState, {user: User}> = (
  state,
) => {
  return {
    user: state.authentication.user!,
  };
};

export const Drawer: React.FC<DrawerContentComponentProps> = ({navigation}) => {
  const {user} = useSelector(drawerSelector);
  const goToRoute = React.useCallback(
    (route: keyof AuthorizedStoryboardParamList) => () => {
      navigation.navigate(route);
    },
    [navigation],
  );

  return (
    <>
      <View style={styles.header}>
        <Avatar
          size={100}
          source={{
            uri:
              'https://1.bp.blogspot.com/-rt6mn1dJJ7M/XqZl2p-TboI/AAAAAAAAjO8/SzKdmwQAFhUH2CXgUH6kluj_G8Gig2-xgCLcBGAsYHQ/s1600/Anh-avatar-dep-cho-con-trai%2B%25281%2529.jpg',
          }}
          rounded
        />
        <View>
          <TextView style={styles.username} text={user.displayName} />
          <TextView style={styles.email} text={user.email} />
        </View>
      </View>

      <SafeAreaView edges={['bottom']}>
        <DrawerItem
          onPress={goToRoute('Dashboard')}
          icon={() => <Icon type="ionicon" name="home-outline" />}
          label="Home"
        />
        <DrawerItem
          onPress={goToRoute('TaskList')}
          icon={() => <Icon type="ionicon" name="clipboard-outline" />}
          label="My Tasks"
        />
        <DrawerItem
          onPress={() => {}}
          icon={() => <Icon type="ionicon" name="nuclear-outline" />}
          label="Asset Map"
        />
        <DrawerItem
          onPress={goToRoute('IssueMap')}
          icon={() => <Icon type="ionicon" name="alert-circle-outline" />}
          label="Issues"
        />
        <DrawerItem
          onPress={() => {}}
          icon={() => <Icon type="ionicon" name="help-circle-outline" />}
          label="Help"
        />
        <DrawerItem
          onPress={() => {}}
          icon={() => <Icon type="ionicon" name="log-out-outline" />}
          label="Logout"
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 250,
    backgroundColor: Colors.gray,
    paddingHorizontal: 30,
    paddingTop: 40,
    justifyContent: 'space-around',
  },
  username: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  email: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
