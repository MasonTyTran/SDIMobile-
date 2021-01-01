import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';

import {Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {FullScreenLoadingIndicator, TextField, TextView} from '@components';

import {useSignIn} from './SignIn.hooks';
import {SignInProps} from './types';

const _SignIn: React.FC<SignInProps> = (props) => {
  const {} = props;
  const onSignInFailed = React.useCallback(() => {
    console.warn('Success');
  }, []);
  const {isAuthenticating, submit} = useSignIn({
    onSignInFailed,
  });
  const renderForm = () => {
    return (
      <View style={styles.formContainer}>
        <TextField
          inputProps={{placeholder: 'Username'}}
          containerStyle={styles.input}
        />
        <TextField
          inputProps={{placeholder: 'Password'}}
          containerStyle={styles.input}
        />
        <TextView style={styles.forgotPass} text="Forgot password" />
        <Button onPress={submit} title="ĐĂNG NHẬP" />
      </View>
    );
  };
  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={{
        uri:
          'https://www.vistaprojects.com/media/2019/07/workplace-safety-topics-for-meetings.png',
      }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <FullScreenLoadingIndicator visible={isAuthenticating} />
        <Image
          style={styles.logo}
          source={{
            uri: 'https://image.flaticon.com/icons/png/512/235/235861.png',
          }}
        />
        {renderForm()}
      </KeyboardAwareScrollView>
      <TextView style={styles.version} text="Version 1.0.0" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    flex: 1,
  },
  logo: {
    width: 180,
    height: 180,
  },
  formContainer: {
    width: '100%',
    marginVertical: 16,
  },
  input: {
    marginTop: 24,
    backgroundColor: 'white',
  },
  forgotPass: {
    paddingVertical: 8,
    color: 'white',
    alignSelf: 'flex-end',
  },
  version: {
    color: 'white',
    alignSelf: 'center',
    paddingVertical: 20,
  },
});

export const SignIn = React.memo(_SignIn);
