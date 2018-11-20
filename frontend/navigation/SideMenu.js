import PropTypes from "prop-types";
import React, {Component} from "react";
import {NavigationActions} from "react-navigation";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {ScrollView, Text, View, StyleSheet, AsyncStorage} from "react-native";
import { StackNavigator } from "react-navigation";
import Colors from "../constants/Colors";
import Font from "../constants/Font";

// actions
import * as actions from "../actions/";

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  navItemStyle: {
    padding: 10,
    textAlign: "center",
    fontSize: Font.normSize,
  },
  navSectionStyle: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.sNorm,
    paddingVertical: 10
  },
  sectionHeadingStyle: {
    paddingTop: 20,
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: Font.normSize,
  },
  footerContainer: {
    padding: 20,
  },
  button: {
    fontSize: Font.butSize,
    color: Colors.buttonText,
    fontWeight: Font.thick,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.sNorm,
    backgroundColor: Colors.sNorm,
    overflow: "hidden",
  },
});

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  async signOut() {
    this.props.actions.clearUser();
    await AsyncStorage.clear();
    this.props.navigation.navigate("SignIn");
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.navSectionStyle}>
            <Text style={styles.sectionHeadingStyle}>
              Welcome {this.props.user.data.firstName}
            </Text>
          </View>
          <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={() => {this.props.navigation.navigate("Main")}}>
              Browse
            </Text>
          </View>
          <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={() => {}}>
              My Profile
            </Text>
          </View>
          <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={() => {this.props.navigation.navigate("EmployerJobs")}}>
              My Job Postings
            </Text>
          </View>
          <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={() => {this.props.navigation.navigate("TakenJobs")}}>
              Taken Jobs
            </Text>
          </View>
          <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={() => {this.props.navigation.navigate("CreateJob")}}>
              Create Job
            </Text>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <View>
            <Text style={[styles.navItemStyle, styles.button]} onPress={this.signOut}>
              Sign Out
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

function mapStateToProps(state) {
	const props = {
		user: state.user,
	};
	return props;
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
