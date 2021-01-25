import * as React from 'react';
import {} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {enableScreens} from 'react-native-screens';

import {AuthDrawerNavigator} from './DrawerNavigator';
import {AuthenticationNavigator} from './AuthenticationStack';
import {RootStoreState, signOut} from '@shared-state';
import {FullScreenLoadingIndicator} from '../component/indicator';
import {container} from 'tsyringe';
import {RxRemoteProvider} from '@core';
import {AppDependencies} from '@di';
import {showMessage} from 'react-native-flash-message';

enableScreens();
const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  const {isAuthorized, isAuthenticating, isSigningOut} = useSelector(
    ({authentication}: RootStoreState) => authentication,
  );

  const dispatch = useDispatch();

  const handleTokenExpired = React.useCallback(() => {
    const provider = container.resolve<RxRemoteProvider>(
      AppDependencies.ApiProvider,
    );
    provider.onUnAuthorized = () => {
      dispatch(signOut());
      showMessage({
        message: 'Hết hạn phiên làm việc, vui lòng đăng nhập lại.',
        type: 'danger',
      });
    };
  }, [dispatch]);

  React.useEffect(() => {
    // dispatch(signInLocally());
    handleTokenExpired();
  }, [dispatch, handleTokenExpired]);

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
      <FullScreenLoadingIndicator visible={isAuthenticating || isSigningOut} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {renderStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
