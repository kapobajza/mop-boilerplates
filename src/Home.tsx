import React, { FC } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import RoundedButton from './components/Button/RoundedButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from './types/navigation';

interface Props {
  navigation: StackNavigationProp<AppStackParamList, 'Home'>;
}

const Home: FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <RoundedButton
        title="Flash message demo"
        onPress={() => navigation.navigate('FlashMessageDemo')}
      />
      <RoundedButton
        title="Full screen loading demo"
        onPress={() => navigation.navigate('FullScreenLoadingDemo')}
      />
      <RoundedButton
        title="useLoading demo"
        onPress={() => navigation.navigate('UseLoadingDemo')}
      />
      <RoundedButton
        title="useLoadMore demo"
        onPress={() => navigation.navigate('UseLoadMoreDemo')}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
