import * as React from 'react';
import {} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {enableScreens} from 'react-native-screens';

import {AuthDrawerNavigator} from './DrawerNavigator';
import {AuthenticationNavigator} from './AuthenticationStack';
import {RootStoreState, signInLocally} from '@shared-state';
import {FullScreenLoadingIndicator} from '../component/indicator';

enableScreens();
const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  const {isAuthorized, isAuthenticating} = useSelector(
    ({authentication}: RootStoreState) => authentication,
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(signInLocally());
  }, [dispatch]);

  const renderStack = () => {
    if (isAuthorized) {
      return (
        <Stack.Screen
          component={AuthDrawerNavigator}
          name="AuthorizedNavigator"
        />
      );
    }
    return (
      <Stack.Screen
        component={AuthenticationNavigator}
        name="AuthenticationNavigator"
      />
    );
  };
  return (
    <NavigationContainer>
      <FullScreenLoadingIndicator visible={isAuthenticating} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {renderStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
