import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {AuthenticationStoryboardParamList} from '@storyboards';
import {ForgotPass, SignIn} from '@containers';

const Stack = createStackNavigator<AuthenticationStoryboardParamList>();

export const AuthenticationNavigator: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={'SignIn'}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
    </Stack.Navigator>
  );
};
