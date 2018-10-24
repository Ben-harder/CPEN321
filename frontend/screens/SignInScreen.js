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
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.actions.userData(res.data);
        this.props.navigation.navigate('App');
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
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text>Enter your phone number:</Text>
          <PhoneInput
              ref={ref => {
                this.phone = ref;
              }}
              initialCountry='ca'
            />
          <Text>Enter your password:</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, padding: 10}}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
          />
          <TouchableOpacity onPress={this.attemptSignIn} style={styles.textLink}>
            <Text style={styles.textLinkText}>Sign In</Text>
          </TouchableOpacity>
          <Text>or</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')} style={styles.textLink}>
            <Text style={styles.textLinkText}>Click Here to Sign Up</Text>
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
