import React from 'react'
import {
  ActivityIndicator,
  AppRegistry,
  Text,
  View,
} from 'react-native'
import Colors from "../constants/Colors";

// styles
const s = require('../constants/style');

const Loading = () => (
      <View style={s.container}>
        <Text style={s.loadingText}>Loading</Text>
        <ActivityIndicator size="small" color={Colors.sDark} />
      </View>
  );

export default Loading;

