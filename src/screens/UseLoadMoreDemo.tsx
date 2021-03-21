import axios from 'axios';
import React, { useEffect } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../ComponentLibrary/styles';
import { Avatar } from '../components/Avatar';
import { useFullScreenLoading } from '../components/FullScreenLoading';

import { useLoadMore } from '../hooks';

interface User {
  id: string;
  job: string;
  name: string;
  avatar: string;
  color_id: string;
}

const UseLoadMoreDemo = () => {
  const { startLoading, stopLoading } = useFullScreenLoading();
  const { onLoadMore, data, loading, initialLoading } = useLoadMore<User>(async (limit, page) => {
    const { data } = await axios.get<User[]>(
      `https://604436d5a20ace001728ed48.mockapi.io/users?page=${page}&limit=${limit}`,
    );

    return data;
  });

  const renderItem = ({ item }: ListRenderItemInfo<User>) => {
    return (
      <View style={styles.itemContent}>
        <Avatar name={item.name} id={item.color_id} />
        <View>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.job}>{item.job}</Text>
        </View>
      </View>
    );
  };

  const keyExtractor = (item: User) => item.id;

  useEffect(() => {
    if (initialLoading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [initialLoading]);

  const ListFooter = loading ? (
    <ActivityIndicator size="large" style={styles.loading} color={Colors.black} />
  ) : null;

  const ListHeader = <View style={styles.spacer} />;

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
      />
    </SafeAreaView>
  );
};

export default UseLoadMoreDemo;

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 10,
  },
  itemContent: {
    flexDirection: 'row',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: Colors.bunker,
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  spacer: {
    marginTop: 20,
  },
  loading: {
    marginTop: 10,
  },
  job: {
    color: Colors.gray,
    fontSize: 13,
  },
});
