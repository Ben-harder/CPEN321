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

class SignUpScreen extends React.Component {
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
        {this.renderInfo()}
        <Button title="Sign Up" onPress={this._signInAsync} />
        <Text>or</Text>
        <Button title="Click here to Sign In" onPress={() => this.props.navigation.navigate('SignIn')} />
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
  },
});

export default SignUpScreen;