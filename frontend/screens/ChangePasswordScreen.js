import React from "react";
import
{
    Text,
    TouchableOpacity,
    View,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
} from "react-native";
import { connect } from "react-redux";
import api from "../constants/Url";
import axios from "axios";
import styles from '../constants/KeyboardStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// components
import Loading from "../components/Loading";

// styles
const s = require('../constants/style');

class ChangePassword extends React.Component
{
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      loading: false
    };

    this.changePassword = this.changePassword.bind(this);
  }

  changePassword() {
    const { user } = this.props;

    if (!this.state.oldPassword || !this.state.newPassword || !this.state.newPasswordConfirm) {
      alert("Please fill out all the fields!");
    } else if (this.state.newPassword !== this.state.newPasswordConfirm) {
      alert("Your new passwords do not match! Please fill them out again.");
    } else {
      this.setState({ loading: true });
      // login user to see if old password is correct
      axios.get(`${api}/auth/sign-in`, {
        params: {
          phoneNumber: user.data.phoneNumber,
          password: this.state.oldPassword
        }
      }).then((res) => {
        axios.post(`${api}/user/update-password`, {
          userID: user.data.ID,
          password: this.state.newPassword,
          passwordConfirm: this.state.newPasswordConfirm
        }).then((res) => {
          this.setState({ loading: false });
          alert("You have successfully changed your password!");
          this.props.navigation.navigate("ProfileDetails");
        }).catch((err) => {
          this.setState({ loading: false });
          console.log(err.response.data.errorMessage);
          alert(err.response.data.errorMessage);
        });
      }).catch((err) => {
        if (err.response.data.errorMessage === "Login info is invalid!") {
          alert("Your old password is incorrect!");
          this.setState({ loading: false });
        } else {
          alert(err.response.data.errorMessage);
          this.setState({ loading: false });
        }
        
      });
    }
  }

  render() {
    const { user, navigation } = this.props;

    if (this.state.loading) return <Loading />;

    return (
      // <KeyboardAvoidingView style={styles.container} behavior="padding">
      <KeyboardAwareScrollView
      style={{ backgroundColor: '#E1E2E1' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={s.container}>
            <View style={s.contentContainer}>
              <View>
                <Text style={s.regText}>Old Password:</Text>
                <TextInput
                  style={s.textInput}
                  onChangeText={(text) => this.setState({oldPassword: text})}
                  value={this.state.oldPassword}
                  returnKeyType='done'
                  secureTextEntry={true}
                />
              </View>

              <View>
                <Text style={s.regText}>New Password:</Text>
                <TextInput
                  style={s.textInput}
                  onChangeText={(text) => this.setState({newPassword: text})}
                  value={this.state.newPassword}
                  returnKeyType='done'
                  secureTextEntry={true}
                />
              </View>

              <View>
                <Text style={s.regText}>New Password Confirm:</Text>
                <TextInput
                  style={s.textInput}
                  onChangeText={(text) => this.setState({newPasswordConfirm: text})}
                  value={this.state.newPasswordConfirm}
                  returnKeyType='done'
                  secureTextEntry={true}
                />
              </View>

              <TouchableOpacity onPress={this.changePassword} style={s.textLink}>
                <Text style={s.textLinkText}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("ProfileDetails")} style={s.textLink}>
                <Text style={s.textLinkTextBack}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    );
  }

}

function mapStateToProps(state) {
	const props = {
		user: state.user,
	};
	return props;
}

export default connect(mapStateToProps)(ChangePassword);
