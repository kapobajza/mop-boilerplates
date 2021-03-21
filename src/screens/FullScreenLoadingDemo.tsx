import React from 'react';
import { StyleSheet } from 'react-native';
import RoundedButton from '../components/Button/RoundedButton';

import { Container } from '../components/Container';
import { useFullScreenLoading } from '../components/FullScreenLoading';
import { sleep } from '../util';

const FullScreenLoadingDemo = () => {
  const { startLoading, stopLoading } = useFullScreenLoading();

  const onStartPress = async () => {
    startLoading();

    await sleep();

    stopLoading();
  };

  return (
    <Container>
      <RoundedButton title="Start full screen loading" onPress={onStartPress} />
    </Container>
  );
};

export default FullScreenLoadingDemo;

const styles = StyleSheet.create({});
