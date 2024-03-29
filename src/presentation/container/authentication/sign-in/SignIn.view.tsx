import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';

import {Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Footer, TextField, TextView} from '@components';
import {useSignIn} from './SignIn.hooks';
import {SignInProps} from './types';
import {Images} from '@assets';
import {Colors} from '@resources';
import {showMessage} from 'react-native-flash-message';
import {BuildConfig} from '@core';

import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

const _SignIn: React.FC<SignInProps> = (props) => {
  const {} = props;

  const onSignInFailed = React.useCallback(() => {
    showMessage({message: 'Thông tin đăng nhập sai', type: 'danger'});
  }, []);
  const {submit, setPassword, setUsername, setSelectedOrganization} = useSignIn(
    {
      onSignInFailed,
    },
  );
  const renderForm = () => {
    return (
      <View style={styles.formContainer}>
        <TextField
          inputProps={{
            placeholder: 'Tổ chức',
            onChangeText: setSelectedOrganization,
          }}
          containerStyle={styles.input}
        />
        <TextField
          inputProps={{placeholder: 'Tài khoản', onChangeText: setUsername}}
          containerStyle={styles.input}
        />
        <TextField
          inputProps={{
            placeholder: 'Mật khẩu',
            secureTextEntry: true,
            onChangeText: setPassword,
          }}
          containerStyle={styles.input}
        />
        <TextView
          onPress={() => props.navigation.navigate('ForgotPass')}
          style={styles.forgotPass}
          text="Quên mật khẩu"
        />
        <Button
          buttonStyle={{backgroundColor: Colors.gray}}
          onPress={submit}
          title="ĐĂNG NHẬP"
        />
      </View>
    );
  };
  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={{
        uri: BuildConfig.BackgroundUrl,
      }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Image style={styles.logo} source={Images.LOGO} resizeMode="contain" />
        {renderForm()}
      </KeyboardAwareScrollView>
      <Footer hasG />
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
    width: 220,
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
    color: Colors.gray,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  version: {
    color: 'white',
    alignSelf: 'center',
    paddingVertical: 20,
  },
});

export const SignIn = React.memo(_SignIn);
