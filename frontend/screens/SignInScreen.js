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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 40,
  },
  textLink: {
    paddingVertical: 15,
  },
  textLinkText: {
    fontSize: Font.butSize,
    color: Colors.buttonText,
    fontWeight: Font.thick,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.sNorm,
    backgroundColor: Colors.sNorm,
    textAlign: 'center',
  },
  innerContainer: {
    width: "100%",
    justifyContent: "center",
  },
  regText: {
    fontSize: Font.normSize,
    fontWeight: Font.thick,
    textAlign: 'center',
  },
});

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
        <View style={styles.container}>
          <Text style={[styles.regText, {paddingBottom: 40}]}>Enter your phone number to sign in:</Text>
          <PhoneInput style={{paddingBottom: 40}}
              ref={ref => {
                this.phone = ref;
              }}
              initialCountry="ca"
            />
          <Text style={styles.regText}>Enter your password:</Text>
          <TextInput
            style={{padding: 10,}}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={this.attemptSignIn} style={styles.textLink}>
            <Text style={styles.textLinkText}>Sign In</Text>
          </TouchableOpacity>
          <Text style={styles.regText}>or</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUp")} style={styles.textLink}>
            <Text style={styles.textLinkText}>Click Here to Sign Up</Text>
          </TouchableOpacity>
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
