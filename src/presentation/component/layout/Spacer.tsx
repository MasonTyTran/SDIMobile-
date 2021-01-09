import React from 'react';
import {View, StyleSheet} from 'react-native';

export const Spacer: React.FC = (_) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: 16,
  },
});
