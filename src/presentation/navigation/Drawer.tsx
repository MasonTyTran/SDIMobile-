import {
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextView} from '../component/label';
import {Colors} from '../resource/values';

export const Drawer: React.FC<DrawerContentComponentProps> = () => {
  return (
    <>
      <View style={styles.header}>
        <Avatar
          size={100}
          source={{
            uri:
              'https://static.mnewsvn.com/uploads/editors/21/2019/05/22/5ce5347710207.jpg',
          }}
          rounded
        />
        <View>
          <TextView style={styles.username} text="Username" />
          <TextView style={styles.email} text="Email" />
        </View>
      </View>

      <SafeAreaView edges={['bottom']}>
        <DrawerItem
          onPress={() => {}}
          icon={() => <Icon type="ionicon" name="home-outline" />}
          label="Home"
        />
        <DrawerItem
          onPress={() => {}}
          icon={() => <Icon type="ionicon" name="clipboard-outline" />}
          label="My Tasks"
        />
        <DrawerItem
          onPress={() => {}}
          icon={() => <Icon type="ionicon" name="nuclear-outline" />}
          label="Asset Map"
        />
        <DrawerItem
          onPress={() => {}}
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
