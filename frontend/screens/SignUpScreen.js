import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  AsyncStorage,
  TouchableOpacity,
  Text,
  TextInput
} from 'react-native';
import PhoneInput from "react-native-phone-input";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import api from "../constants/Url";
import axios from 'axios';
import phoneNumber from 'react-native-phone-input/lib/phoneNumber';

// actions
import * as actions from '../actions/';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewState: 1,
      phoneNumber: "",
      password: "",
      firstName: "",
      lastName: ""
    };

    this.attemptSignup = this.attemptSignup.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
    this.inputPassword = this.inputPassword.bind(this);
    this.inputName = this.inputName.bind(this);
  }
  
  checkUserExists() {
    if (this.phone.isValidNumber()) {
      axios.get(`${api}/user-exists`, {
        params: {
          phoneNumber: this.phone.getValue()
        }
      }).then((res) => {
        console.log(res.data.phoneNumber);
        this.setState({
          phoneNumber: res.data.phoneNumber,
          viewState: 2
        });
      }).catch((err) => {
        console.log(err);
      });
    } else {
      alert("Invalid phone number");
    }
  }

  attemptSignup() {
    if (this.state.passwordConfirm) {
      axios.post(`${api}/create-user`, {
        phoneNumber: this.state.phoneNumber,
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }).then(async (res) => {
        await AsyncStorage.setItem('userToken', 'abc');
        const mockData = {firstName: "William", lastName: "Choi", phoneNumber: "+17789889271"};
        this.props.actions.userData(mockData);
        this.props.navigation.navigate('App');
      }).catch((err) => {
        console.log(err);
        alert(err.response.data.errorMessage);
      });
    } else {
      alert("Please fill out the field");
    }
  }

  inputPassword() {
    if (this.state.password) {
      this.setState({
        viewState: 4
      });
    } else {
      alert("Please fill out the field");
    }
  }

  inputName() {
    if (this.state.firstName && this.state.lastName) {
      this.setState({
        viewState: 3
      });
    } else {
      alert("Please fill out all the fields");
    }
  }


  render() {
    return (
      <View style={styles.container}>
        {this.state.viewState === 1 && 
        <View style={styles.innerContainer}>
          <Text>Enter your phone number:</Text>
          <PhoneInput
              ref={ref => {
                this.phone = ref;
              }}
              initialCountry='ca'
            />
          <TouchableOpacity onPress={this.checkUserExists} style={styles.textLink}>
            <Text style={styles.textLinkText}>Sign Up</Text>
          </TouchableOpacity>
          <Text>or</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')} style={styles.textLink}>
            <Text style={styles.textLinkText}>Click Here to Sign In</Text>
          </TouchableOpacity>
        </View>}
        {this.state.viewState === 2 &&
        <View style={styles.innerContainer}>
          <Text>First Name:</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, padding: 10}}
            onChangeText={(text) => this.setState({firstName: text})}
            value={this.state.firstName}
          />
          <Text>Last Name:</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, padding: 10}}
            onChangeText={(text) => this.setState({lastName: text})}
            value={this.state.lastName}
          />
          <TouchableOpacity onPress={this.inputName} style={styles.textLink}>
            <Text style={styles.textLinkText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({viewState: 1})} style={styles.textLink}>
            <Text style={styles.textLinkText}>Back</Text>
          </TouchableOpacity>
        </View>}
        {this.state.viewState === 3 && 
        <View style={styles.innerContainer}>
          <Text>Enter a password:</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, padding: 10}}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
          />
          <TouchableOpacity onPress={this.inputPassword} style={styles.textLink}>
            <Text style={styles.textLinkText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({viewState: 1})} style={styles.textLink}>
            <Text style={styles.textLinkText}>Back</Text>
          </TouchableOpacity>
        </View>}
        {this.state.viewState === 4 &&
        <View style={styles.innerContainer}>
          <Text>Confirm your password:</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, padding: 10}}
            onChangeText={(text) => this.setState({passwordConfirm: text})}
            value={this.state.passwordConfirm}
          />
          <TouchableOpacity onPress={this.attemptSignup} style={styles.textLink}>
            <Text style={styles.textLinkText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({viewState: 2})} style={styles.textLink}>
            <Text style={styles.textLinkText}>Back</Text>
          </TouchableOpacity>
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 40,
  },
  textLink: {
    paddingVertical: 15,
  },
  textLinkText: {
    fontSize: 18,
    color: '#2e78b7',
  },
  innerContainer: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function mapStateToProps(state) {
	const props = {
		user: state.user,
	};
	return props;
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
