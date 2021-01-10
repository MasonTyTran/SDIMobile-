import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthenticationStoryboardParamList} from '@storyboards';

export type ForgotPassNavigationProps = StackNavigationProp<
  AuthenticationStoryboardParamList,
  'ForgotPass'
>;

export type ForgotPassRouteProp = RouteProp<
  AuthenticationStoryboardParamList,
  'ForgotPass'
>;

export type ForgotPassProps = {
  navigation: ForgotPassNavigationProps;
  route: ForgotPassRouteProp;
};

export type ForgotPassHandle = {
  onForgotPassFailed: () => void;
  onForgotPassSuccess: () => void;
};

export type ForgotPassReduxSelectionState = {
  isAuthenticating: boolean;
};

export type SingInState = {
  isAuthenticating: boolean;
  ForgotPass: () => void;
};
