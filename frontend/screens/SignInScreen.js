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
} from "react-native";
import PhoneInput from "react-native-phone-input";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import api from "../constants/Url";
import axios from "axios";
import phoneNumber from "react-native-phone-input/lib/phoneNumber";
import Colors from "../constants/Colors";
import Font from "../constants/Font";

// actions
import * as actions from "../actions/";

var s = require('../constants/style');

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
    };

    this.attemptSignIn = this.attemptSignIn.bind(this);
  }

  attemptSignIn() {
    const phoneNumber = this.phone.getValue();
    if (phoneNumber && this.state.password) {
      axios.get(`${api}/auth/sign-in`, {
        params: {
          phoneNumber: phoneNumber,
          password: this.state.password
        }
      }).then(async (res) => {
        await AsyncStorage.setItem("userToken", "abc");
        this.props.actions.userData(res.data);
        this.props.navigation.navigate("App");
      }).catch((err) => {
        console.log(err);
        alert(err.response.data.errorMessage);
      });
    } else {
      alert("Please fill all the fields");
    }
  }


  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={s.container}>
          <ImageBackground source={require('../assets/images/min_art2.png')} style={{width: '100%', height: '100%',}}  resizeMode='cover'>
            <Text style={[s.welcomeText, {paddingTop: 80,}]}>Emplorium</Text>
            <View style={s.authContainer}>
              <Text style={[s.regTextBold, {paddingBottom: 40}]}>Enter your phone number to sign in:</Text>
              <PhoneInput style={{backgroundColor: '#ffffff99', padding: 20, borderRadius: 10,}}
                  ref={ref => {
                    this.phone = ref;
                  }}
                  initialCountry="ca"
                />
              <Text style={[s.regTextBold, {marginTop: 20,}]}>Enter your password:</Text>
              <TextInput
                style={[s.textInput,]}
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
                secureTextEntry={true}
                borderBottomColor={'black'}
                underlineColorAndroid={'black'}
                selectionColor={'black'}
              />
              <TouchableOpacity onPress={this.attemptSignIn} style={[s.textLink, {paddingVertical: 40}]}>
                <Text style={s.textLinkTextAlt}>Sign In</Text>
              </TouchableOpacity>
              <Text style={[s.regTextBold]}>or</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUp")} style={[s.textLink, {paddingVertical: 40}]}>
                <Text style={s.textLinkTextAlt}>Click Here to Sign Up</Text>
              </TouchableOpacity>
            </View>
        
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
