import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const Container: FC = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
