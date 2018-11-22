import React from "react";
import
{
    Text,
    TouchableOpacity,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import { connect } from "react-redux";
import api from "../constants/Url";
import axios from "axios";

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
      newPasswordConfirm: ""
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
        }).then((res) => {
          alert("You have successfully changed your password!");
          this.props.navigation.navigate("ProfileDetails");
        }).catch((err) => {
          console.log(err);
          alert(err.response.data.errorMessage);
        });
      }).catch((err) => {
        if (err.response.data.errorMessage === "Login info is invalid!") {
          alert("Your old password is incorrect!");
        } else {
          alert(err.response.data.errorMessage);
        }
        
      });
    }
  }

  render() {
    const { user, navigation } = this.props;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={s.container}>
          <View style={s.contentContainer}>
            <Text>Old Password:</Text>
            <TextInput
              style={s.textInput}
              onChangeText={(text) => this.setState({oldPassword: text})}
              value={this.state.oldPassword}
              returnKeyType='done'
            />
            <Text>New Password:</Text>
            <TextInput
              style={s.textInput}
              onChangeText={(text) => this.setState({newPassword: text})}
              value={this.state.newPassword}
              returnKeyType='done'
            />
            <Text>New Password Confirm:</Text>
            <TextInput
              style={s.textInput}
              onChangeText={(text) => this.setState({newPasswordConfirm: text})}
              value={this.state.newPasswordConfirm}
              returnKeyType='done'
            />

            <TouchableOpacity onPress={this.changePassword} style={s.textLink}>
              <Text style={s.textLinkText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("ProfileDetails")} style={s.textLink}>
              <Text style={s.textLinkText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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

export default connect(mapStateToProps)(ChangePassword);
