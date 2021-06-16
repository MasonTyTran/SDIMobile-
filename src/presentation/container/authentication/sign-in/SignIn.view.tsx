import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';

import {Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Footer, TextField, TextView} from '@components';
import {TypePicker} from './TypePicker';
import {useSignIn} from './SignIn.hooks';
import {SignInProps} from './types';
import {Images} from '@assets';
import {Colors} from '@resources';

const _SignIn: React.FC<SignInProps> = (props) => {
  const {} = props;
  const onSignInFailed = React.useCallback(() => {
    console.warn('Success');
  }, []);
  const {
    submit,
    setPassword,
    setUsername,
    selectedOrganization,
    setSelectedOrganization,
  } = useSignIn({
    onSignInFailed,
  });
  const renderForm = () => {
    return (
      <View style={styles.formContainer}>
        <TypePicker
          value={selectedOrganization}
          onChange={setSelectedOrganization}
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
        uri:
          'https://www.vistaprojects.com/media/2019/07/workplace-safety-topics-for-meetings.png',
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
