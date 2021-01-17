import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  View,
  ImageSourcePropType,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';

export interface IconLabelProps extends TextProps {
  prefix?: React.ReactNode;
  prefixIcon?: ImageSourcePropType;

  suffix?: React.ReactNode;
  suffixIcon?: ImageSourcePropType;

  text?: string;
  color?: string;

  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const _IconLabel: React.FC<IconLabelProps> = (props) => {
  const {
    prefixIcon,
    text,
    containerStyle,
    labelStyle,
    prefix,
    suffix,
    suffixIcon,
    color,
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
      return <Image source={suffixIcon} />;
    }
    return null;
  };
  return (
    <Pressable
      onPress={props.onPress}
      style={[_styles.container, containerStyle]}>
      {renderPrefix()}
      <Text style={[_styles.label, labelStyle, {color}]}>{text}</Text>
      {renderSuffix()}
    </Pressable>
  );
};

const _styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginHorizontal: 8,
  },
});

export const IconLabel = React.memo(_IconLabel);
