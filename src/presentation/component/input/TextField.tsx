import React from 'react';
import {
  View,
  Image,
  ImageSourcePropType,
  TextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInput,
} from 'react-native';
import {TextView} from '../label';

export interface TextFieldProps {
  containerStyle?: StyleProp<ViewStyle>;

  prefix?: React.ReactNode;
  prefixIcon?: ImageSourcePropType;

  suffix?: React.ReactNode;
  suffixIcon?: ImageSourcePropType;

  errorLabel?: string;

  inputProps?: TextInputProps;
}

export const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    containerStyle,
    prefix,
    prefixIcon,
    suffix,
    suffixIcon,
    errorLabel,
    inputProps = {},
  } = props;

  const renderPrefix = () => {
    if (prefix) {
      return prefix;
    }
    if (prefixIcon) {
      return <Image source={prefixIcon} />;
    }
    return null;
  };

  const renderSuffix = () => {
    if (suffix) {
      return suffix;
    }
    if (suffixIcon) {
      return (
        <>
          <Image source={suffixIcon} />
          <View style={_styles.padding} />
        </>
      );
    }
    return null;
  };
  const renderError = () => {
    if (!errorLabel) {
      return null;
    }
    return <TextView text={errorLabel} />;
  };

  return (
    <View style={[_styles.container, containerStyle]}>
      <View style={_styles.content}>
        {renderPrefix()}

        <TextInput {...inputProps} style={[_styles.input, inputProps.style]} />
        {renderSuffix()}
      </View>
      {renderError()}
    </View>
  );
};

const _styles = StyleSheet.create({
  container: {
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  padding: {width: 16},
});
