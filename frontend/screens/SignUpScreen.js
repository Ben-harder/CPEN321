import React from "react";
import {
  StyleSheet,
  View,
  Button,
  AsyncStorage,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import PhoneInput from "react-native-phone-input";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import api from "../constants/Url";
import axios from "axios";
import Colors from "../constants/Colors";
import Font from "../constants/Font";

var s = require('../constants/style');

// actions
import * as actions from "../actions/";

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewState: 1,
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
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
      axios.get(`${api}/auth/user-exists`, {
        params: {
          phoneNumber: this.phone.getValue()
        }
      }).then((res) => {
        this.setState({
          phoneNumber: this.phone.getValue(),
          viewState: 2
        });
      }).catch((err) => {
        console.log(err);
        alert(err.response.data.errorMessage);
      });
    } else {
      alert("Invalid phone number");
    }
  }

  attemptSignup() {
    if (this.state.passwordConfirm) {
      axios.post(`${api}/auth/create-user`, {
        phoneNumber: this.state.phoneNumber,
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }).then(async (res) => {
        await AsyncStorage.setItem("userToken", "abc");
        this.props.actions.userData(res.data);
        this.props.navigation.navigate("App");
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={s.container}>
        <ImageBackground source={require('../assets/images/min_art1.png')} style={{width: '100%', height: '100%',}}  resizeMode='cover'> 
          <Text style={[s.welcomeText, {paddingTop: 80,}]}>Emplorium</Text>
          {this.state.viewState === 1 &&
              <View style={[s.authContainer]}>
                <Text style={[s.regTextBold, {paddingBottom: 40}]}>Enter your phone number to sign up:</Text>
                <PhoneInput style={{backgroundColor: '#ffffff99', padding: 20, borderRadius: 10, marginVertical: 5,}}
                    ref={ref => {
                      this.phone = ref;
                    }}
                    initialCountry="ca"
                  />
                <TouchableOpacity onPress={this.checkUserExists} style={[s.textLink, {paddingVertical: 40}]}>
                  <Text style={s.textLinkText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={[s.regTextBold,]}>or</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("SignIn")} style={[s.textLink, {paddingVertical: 40,}]}>
                  <Text style={s.textLinkText}>Click Here to Sign In</Text>
                </TouchableOpacity>
              </View>}
              {this.state.viewState === 2 &&
              <View style={s.innerContainer}>
                <View>
                  <Text style={[s.regTextBold]}>First Name:</Text>
                  <TextInput
                    style={s.textInput}
                    onChangeText={(text) => this.setState({firstName: text})}
                    value={this.state.firstName}
                    returnKeyType='done'
                    />

                  <Text style={[s.regTextBold]}>Last Name:</Text>
                  <TextInput
                    style={s.textInput}
                    onChangeText={(text) => this.setState({lastName: text})}
                    value={this.state.lastName}
                    underlineColorAndroid='transparent'
                    returnKeyType='done'
                  />

                  <TouchableOpacity onPress={this.inputName} style={s.textLink}>
                    <Text style={s.textLinkText}>Continue</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setState({viewState: 1})} style={s.textLink}>
                    <Text style={s.textLinkTextBack}>Back</Text>
                  </TouchableOpacity>

                </View>
              </View>}
              {this.state.viewState === 3 && 
              <View style={s.innerContainer}>
                <View>
                  <Text style={[s.regTextBold]}>Enter a password:</Text>
                  <TextInput
                    style={s.textInput}
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    returnKeyType='done'
                  />
                  <TouchableOpacity onPress={this.inputPassword} style={s.textLink}>
                    <Text style={s.textLinkText}>Continue</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setState({viewState: 2})} style={s.textLink}>
                    <Text style={s.textLinkTextBack}>Back</Text>
                  </TouchableOpacity>
                </View>
              </View>}
              {this.state.viewState === 4 &&
              <View style={s.innerContainer}>
                <View>
                  <Text style={[s.regTextBold]}>Confirm your password:</Text>
                  <TextInput
                    style={s.textInput}
                    onChangeText={(text) => this.setState({passwordConfirm: text})}
                    value={this.state.passwordConfirm}
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    returnKeyType='done'
                  />
                  <TouchableOpacity onPress={this.attemptSignup} style={s.textLink}>
                    <Text style={s.textLinkText}>Create Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setState({viewState: 3})} style={s.textLink}>
                    <Text style={s.textLinkTextBack}>Back</Text>
                  </TouchableOpacity>
                </View>
              </View>}
        </ImageBackground>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

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
