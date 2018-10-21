import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  AsyncStorage,
  TouchableOpacity,
  Text
} from 'react-native';
import PhoneInput from "react-native-phone-input";

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: "",
      type: "",
      value: ""
    };

    this.updateInfo = this.updateInfo.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
  }

  updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue()
    });
  }

  renderInfo() {
    if (this.state.value) {
      return (
        <View style={styles.info}>
          <Text>
            Is Valid:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {this.state.valid.toString()}
            </Text>
          </Text>
          <Text>
            Type: <Text style={{ fontWeight: "bold" }}>{this.state.type}</Text>
          </Text>
          <Text>
            Value:{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.value}</Text>
          </Text>
        </View>
      );
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Enter your phone number:</Text>
        <PhoneInput
            ref={ref => {
              this.phone = ref;
            }}
            initialCountry='ca'
          />
        <TouchableOpacity onPress={this._signInAsync} style={styles.textLink}>
          <Text style={styles.textLinkText}>Sign In</Text>
        </TouchableOpacity>
        <Text>or</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')} style={styles.textLink}>
          <Text style={styles.textLinkText}>Click Here to Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
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
});

export default SignInScreen;