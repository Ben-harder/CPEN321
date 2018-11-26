import PropTypes from "prop-types";
import React, {Component} from "react";
import {NavigationActions} from "react-navigation";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {ScrollView, Text, View, StyleSheet, AsyncStorage, Image} from "react-native";
import { StackNavigator } from "react-navigation";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { TouchableOpacity } from 'react-native';
import api from "../constants/Url";
import axios from "axios";
import IOSIcon from "react-native-vector-icons/Ionicons";

const s = require('../constants/style');

const placeholderImage = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

// actions
import * as actions from "../actions/";

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      downVotes: 0,
      upVotes: 0,
      numOfTakenJobs: 0,
      numOfPostedJobs: 0,
      loading: true,
    };

    this.getUserStats = this.getUserStats.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.getUserStats();
  }

  getUserStats() {
    const { user } = this.props;

    axios.get(`${api}/user/get-user-profile`, {
      params: {
        userID: user.data.ID
      }
    }).then((res) => {
      this.setState({
        downVotes: res.data.downVotes,
        upVotes: res.data.upVotes,
        numOfTakenJobs: res.data.numOfTakenJobs,
        numOfPostedJobs: res.data.numOfPostedJobs,
        loading: false
      });
    }).catch((err) => {
      console.log(err);
      alert(err.response.data.errorMessage);
    });
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
      <View style={s.container}>
        <View style={s.navHeader}>
          <Image source={{ uri: placeholderImage }} style={[s.profilePicture, {width: 75, height: 75}]} />
          <View style={{justifyContent: 'space-evenly'}}>
            <Text style={[s.regTextBold,{fontStyle: 'italic', color: 'white'}]}>
              <Text> Welcome {this.props.user.data.firstName} </Text>
            </Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <View style={{flexDirection: 'row'}}>
                <IOSIcon name={'ios-thumbs-up'} size={30} color={Colors.sLight}/>
                <Text style={[s.regTextBold, {color: 'white'}]}> {this.state.upVotes} </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <IOSIcon name={'ios-thumbs-down'} size={30} color={Colors.sLight}/>
                <Text style={[s.regTextBold, {color: 'white'}]}> {this.state.downVotes} </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{width: '100%'}}>
          <TouchableOpacity style={s.navItem} onPress={() => {this.props.navigation.navigate("CreateJob")}}>
            <Text style={s.regText}>
              Create Job
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.navItem} onPress={() => {this.props.navigation.navigate("Main")}}>
            <Text style={s.regText}>
              Browse
            </Text>
          </TouchableOpacity>          
          <TouchableOpacity style={s.navItem} onPress={() => {this.props.navigation.navigate("EmployerJobs")}}>
            <Text style={s.regText}>
              My Job Postings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.navItem} onPress={() => {this.props.navigation.navigate("ActiveJobs")}}>
            <Text style={s.regText}>
              Active Jobs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.navItem} onPress={() => {this.props.navigation.navigate("AppliedJobs")}}> 
            <Text style={s.regText}>
              Job Applications
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.navItem} onPress={() => {this.props.navigation.navigate("Profile")}}>
            <Text style={s.regText}>
              My Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '90%', paddingTop: 10, paddingBottom: 30}}>
          <TouchableOpacity style={s.textLink} onPress={this.signOut}>
            <Text style={s.textLinkText}> Sign Out </Text>
          </TouchableOpacity>
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
