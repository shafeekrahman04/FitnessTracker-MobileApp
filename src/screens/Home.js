import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../utilities/styles/GlobalStyles';

export default function Home() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
