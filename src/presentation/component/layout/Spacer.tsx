import React from 'react';
import {View, StyleSheet} from 'react-native';

export const Spacer: React.FC = (_) => {
  return <View style={styles.container} />;
};

export const HSpacer: React.FC = (_) => {
  return <View style={styles.hContainer} />;
};

const styles = StyleSheet.create({
  container: {
    height: 16,
  },
  hContainer: {
    width: 16,
  },
});
