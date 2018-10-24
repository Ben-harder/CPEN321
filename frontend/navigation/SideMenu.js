import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {ScrollView, Text, View, StyleSheet, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';

// actions
import * as actions from '../actions/';

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
    this.props.navigation.navigate('SignIn');
  };

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
            <Text style={styles.navItemStyle} onPress={() => {}}>
              My Profile
            </Text>
          </View>
          <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={() => {this.props.navigation.navigate('EmployerJobs')}}>
              My Job Postings
            </Text>
          </View>
          <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={() => {this.props.navigation.navigate('TakenJobs')}}>
              Taken Jobs
            </Text>
          </View>
          <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={() => {this.props.navigation.navigate('CreateJob')}}>
              Create Job
            </Text>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.navItemStyle} onPress={this.signOut}>
              Sign Out
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
  }
});

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
