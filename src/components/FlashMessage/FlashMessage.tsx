import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Platform, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MessageType, FlashMessageContextType } from './types';
import FlashMessageState from './State';
import { Icon, IconName } from '../Icon';
import { Colors } from '../../ComponentLibrary/styles';
import { useMountEffect } from '../../ComponentLibrary/hooks';

let timeoutId: any = null;

interface Props {
  setContextValue: Function;
  timeout: number;
}

const { Value, timing } = Animated;

const FlashMessage: React.FC<Props> = ({ setContextValue, timeout }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<MessageType>(null);
  const insets = useSafeAreaInsets();

  const { translateY, slideInAnim, slideOutAnim } = useMemo(() => {
    const initialValue = -300;
    const transY = new Value(initialValue);
    const useNativeDriver = true;
    const duration = 500;

    return {
      translateY: transY,
      slideInAnim: timing(transY, { toValue: 0, useNativeDriver, duration }),
      slideOutAnim: timing(transY, {
        toValue: initialValue,
        useNativeDriver,
        duration,
      }),
    };
  }, []);

  const removeMessageAfterTimeout = useCallback(() => {
    timeoutId = setTimeout(() => {
      slideOutAnim.start(({ finished }) => {
        if (finished) {
          setMessage(null);
          setType(null);
        }
      });
    }, timeout);
  }, [slideOutAnim, timeout]);

  const contextValue: FlashMessageContextType = useMemo(
    () => ({
      showError: (error) => {
        clearTimeout(timeoutId);

        if (__DEV__) {
          console.log('error', error);
        }

        const message = error?.message ?? 'An error occured';
        setMessage(message);
        setType('error');
        removeMessageAfterTimeout();
      },
      showSuccess: (msg) => {
        clearTimeout(timeoutId);
        setMessage(msg);
        setType('success');
        removeMessageAfterTimeout();
      },
      showInfo: (msg) => {
        clearTimeout(timeoutId);
        setMessage(msg);
        setType('info');
        removeMessageAfterTimeout();
      },
    }),
    [removeMessageAfterTimeout],
  );

  useMountEffect(() => {
    // Initialize the centralized state
    FlashMessageState.init(contextValue);
    setContextValue(contextValue);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  useEffect(() => {
    if (message) {
      slideInAnim.start();
    }
  }, [message, slideInAnim]);

  const { backgroundColor, iconName, title } = useMemo(() => {
    let bgColor = '';
    let iconName: IconName = null;
    let title = '';

    if (type === 'error') {
      bgColor = Colors.jasperRed;
      iconName = 'exclamation-circle';
      title = 'Error';
    } else if (type === 'info') {
      bgColor = Colors.linkedINBlue;
      iconName = 'info-circle';
      title = 'Info';
    } else if (type === 'success') {
      bgColor = Colors.eucalyptusGreen;
      iconName = 'check-circle';
      title = 'Success';
    }

    return { backgroundColor: bgColor, iconName, title };
  }, [type]);

  const onClosePress = useCallback(() => {
    clearTimeout(timeoutId);
    slideOutAnim.start(({ finished }) => {
      if (finished) {
        setMessage(null);
        setType(null);
      }
    });
  }, [slideOutAnim]);

  if (!message) {
    return null;
  }

  return (
    <Animated.View style={[styles.root, { transform: [{ translateY }] }]}>
      <View
        style={[
          styles.container,
          styles.horizontalRow,
          {
            backgroundColor,
            paddingTop: Platform.select({
              ios: insets.top > 0 ? insets.top + 10 : 25,
              android: 15,
            }),
          },
        ]}>
        <View style={styles.innerContainer}>
          <View style={styles.horizontalRow}>
            <Icon name={iconName} size={25} color={Colors.white} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={styles.message}>{message}</Text>
        </View>
        <TouchableOpacity onPress={onClosePress} activeOpacity={0.7}>
          <Icon name="times-circle" size={35} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'space-between',
  },
  horizontalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftRow: {
    flexDirection: 'row',
  },
  message: {
    color: Colors.white,
    fontSize: 16,
    marginLeft: 36,
    marginTop: 5,
    maxHeight: 80,
  },
  outerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  innerContainer: {
    flex: 1,
    padding: 10,
  },
  textContainer: {
    marginHorizontal: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    flex: 1,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

export default FlashMessage;
