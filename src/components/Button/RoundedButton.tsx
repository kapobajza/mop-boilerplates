import React, { useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import { Colors } from '../../ComponentLibrary/styles';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const RoundedButton: React.FC<Props> = ({
  title,
  onPress,
  disabled,
  loading,
  containerStyle,
  textStyle,
}) => {
  const disabledStyle = disabled ? { backgroundColor: Colors.onyxGray } : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.container, containerStyle, disabledStyle]}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <View style={styles.innerContainer}>
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RoundedButton;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    alignSelf: 'center',
    backgroundColor: Colors.onyxGray,
    borderRadius: 32,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginBottom: 8,
  },
  icon: {
    marginLeft: 9,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.white,
  },
});
