import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { FlashMessageProvider } from './src/components/FlashMessage';
import { LoadingProvider } from './src/components/FullScreenLoading';
import Home from './src/Home';
import { AppStackParamList } from './src/types/navigation';
import FlashMessageDemo from './src/screens/FlashMessageDemo';
import FullScreenLoadingDemo from './src/screens/FullScreenLoadingDemo';
import UseLoadingDemo from './src/screens/UseLoadingDemo';
import UseLoadMoreDemo from './src/screens/UseLoadMoreDemo';

const Stack = createStackNavigator<AppStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <FlashMessageProvider>
          <LoadingProvider>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen
                name="FlashMessageDemo"
                component={FlashMessageDemo}
                options={{ title: 'Flash message demo' }}
              />
              <Stack.Screen
                name="FullScreenLoadingDemo"
                component={FullScreenLoadingDemo}
                options={{ title: 'Full screen loading demo' }}
              />
              <Stack.Screen
                name="UseLoadingDemo"
                component={UseLoadingDemo}
                options={{ title: 'useLoading demo' }}
              />
              <Stack.Screen
                name="UseLoadMoreDemo"
                component={UseLoadMoreDemo}
                options={{ title: 'useLoadMore demo' }}
              />
            </Stack.Navigator>
          </LoadingProvider>
        </FlashMessageProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
