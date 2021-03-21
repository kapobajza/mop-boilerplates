import React from 'react';
import { StyleSheet } from 'react-native';
import RoundedButton from '../components/Button/RoundedButton';

import { Container } from '../components/Container';
import { useLoading } from '../hooks';
import { sleep } from '../util';

const UseLoadingDemo = () => {
  const [onStartPress, loading] = useLoading(async () => {
    await sleep();
  });

  return (
    <Container>
      <RoundedButton title="Start loading on button" onPress={onStartPress} loading={loading} />
    </Container>
  );
};

export default UseLoadingDemo;

const styles = StyleSheet.create({});
