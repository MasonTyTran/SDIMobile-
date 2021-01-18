import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';

import {Button, Header, Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {showMessage} from 'react-native-flash-message';

import {FullScreenLoadingIndicator, TextField, TextView} from '@components';

import {useForgotPass} from './ForgotPass.hooks';
import {ForgotPassProps} from './types';
import {Colors, TextStyles} from '@resources';

const _ForgotPass: React.FC<ForgotPassProps> = (props) => {
  const {} = props;
  const popBack = React.useCallback(() => props.navigation.pop(), [
    props.navigation,
  ]);
  const onForgotPassFailed = React.useCallback(() => {}, []);
  const onForgotPassSuccess = React.useCallback(() => {
    showMessage({
      message: 'Forgot successfully',
      type: 'success',
      onHide: popBack,
    });
  }, [popBack]);
  const {submit, setUsername, isLoading} = useForgotPass({
    onForgotPassFailed,
    onForgotPassSuccess,
  });
  const renderForm = () => {
    return (
      <View style={styles.formContainer}>
        <TextField
          inputProps={{placeholder: 'Tài khoản', onChangeText: setUsername}}
          containerStyle={styles.input}
        />
        <Button
          buttonStyle={{backgroundColor: Colors.gray}}
          onPress={submit}
          title="Hoàn thành"
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
      <Header
        leftComponent={
          <Icon
            onPress={popBack}
            color={'white'}
            type="ionicon"
            name="arrow-back"
          />
        }
        centerComponent={
          <TextView text="Quên mật khẩu" style={styles.header} />
        }
        backgroundColor={Colors.gray}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <FullScreenLoadingIndicator visible={isLoading} />
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
    marginVertical: 24,
    backgroundColor: 'white',
  },
  header: {
    color: 'white',
    ...TextStyles.title,
  },
  version: {
    color: 'white',
    alignSelf: 'center',
    paddingVertical: 20,
  },
});

export const ForgotPass = React.memo(_ForgotPass);
