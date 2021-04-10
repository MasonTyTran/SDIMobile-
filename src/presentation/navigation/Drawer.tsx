import {
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Selector, useDispatch, useSelector} from 'react-redux';
import {TextView} from '../component/label';
import {Colors} from '../resource/values';
import {RootStoreState, signOut} from '@shared-state';
import {AuthorizedStoryboardParamList} from '../storyboard/Authorized.storyboard';
import {User} from '@domain';
import {Footer} from '../component/brand';

export const drawerSelector: Selector<RootStoreState, {user: User}> = (
  state,
) => {
  return {
    user: state.authentication.user!,
  };
};

export const Drawer: React.FC<DrawerContentComponentProps> = ({navigation}) => {
  const {user} = useSelector(drawerSelector);
  const dispatch = useDispatch();
  const goToRoute = React.useCallback(
    (route: keyof AuthorizedStoryboardParamList) => () => {
      navigation.navigate(route);
    },
    [navigation],
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar
            size={100}
            source={{
              uri:
                'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png',
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
            label="Trang chủ"
          />
          <DrawerItem
            onPress={goToRoute('TaskList')}
            icon={() => <Icon type="ionicon" name="clipboard-outline" />}
            label="Công việc"
          />
          <DrawerItem
            onPress={goToRoute('AssetMap')}
            icon={() => <Icon type="ionicon" name="nuclear-outline" />}
            label="Tài sản"
          />
          <DrawerItem
            onPress={goToRoute('IssueMap')}
            icon={() => <Icon type="ionicon" name="alert-circle-outline" />}
            label="Sự cố"
          />
          {/* <DrawerItem
            onPress={goToRoute('IssueList')}
            icon={() => <Icon type="ionicon" name="alert-circle-outline" />}
            label="Danh sách sự cố"
          /> */}
          {/* <DrawerItem
            onPress={() => {}}
            icon={() => <Icon type="ionicon" name="help-circle-outline" />}
            label="Trợ giúp"
          /> */}
          <DrawerItem
            onPress={goToRoute('NotificationList')}
            icon={() => <Icon type="ionicon" name="notifications-outline" />}
            label="Thông báo"
          />
          <DrawerItem
            onPress={() => dispatch(signOut())}
            icon={() => <Icon type="ionicon" name="log-out-outline" />}
            label="Đăng xuất"
          />
        </SafeAreaView>
      </View>
      <Footer color={Colors.gray} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
