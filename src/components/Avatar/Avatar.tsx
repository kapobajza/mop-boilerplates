import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../ComponentLibrary/styles';
import { getRandomColor } from '../../util';

const getInitials = (name: string) => {
  const splittedName = name.split(' ');
  const initials = splittedName[0][0] + splittedName[1][0];
  return initials;
};

const Avatar: FC<{ name: string; id: string }> = ({ name, id }) => {
  const initials = getInitials(name);
  const backgroundColor = getRandomColor(id);

  return (
    <View style={[styles.avatar, { backgroundColor }]}>
      <Text style={styles.text}>{initials}</Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.midnightBlue,
  },
  text: {
    textTransform: 'uppercase',
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
