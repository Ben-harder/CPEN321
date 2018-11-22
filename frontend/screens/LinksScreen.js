import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";


var s = require('../constants/style');

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Links",
  };

  render() {
    return (
      <ScrollView style={s.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <ExpoLinksView />
      </ScrollView>
    );
  }
}
