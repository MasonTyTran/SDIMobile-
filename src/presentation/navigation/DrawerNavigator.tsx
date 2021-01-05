import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AuthorizedNavigator} from './AuthorizedStack';
import {Drawer as CustomDrawer} from './Drawer';

const Drawer = createDrawerNavigator();

export function AuthDrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="AuthorizedNavigator"
        component={AuthorizedNavigator}
      />
    </Drawer.Navigator>
  );
}
