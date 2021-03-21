import React, { useState, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { LoadingContextType } from './types';
import LoadingState from './State';
import { useMountEffect } from '../../ComponentLibrary/hooks';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../../ComponentLibrary/styles';

interface Props {
  setContextValue: (val: LoadingContextType) => void;
}

const Loading: React.FC<Props> = ({ setContextValue }) => {
  const [loading, setLoading] = useState(false);

  const contextValue: LoadingContextType = useMemo(
    () => ({
      startLoading: () => setLoading(true),
      stopLoading: () => setLoading(false),
      isLoading: loading,
    }),
    [loading],
  );

  useMountEffect(() => {
    LoadingState.init(contextValue);
    setContextValue(contextValue);
  });

  if (!loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    position: 'absolute',
  },
});
