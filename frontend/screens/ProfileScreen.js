import React from "react";
import
{
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { connect } from "react-redux";

// styles
const s = require('../constants/style');

class Profile extends React.Component
{
  static navigationOptions = {
    title: "My Profile",
  };

  render() {
    const { user, navigation } = this.props;

    return (
      <View style={s.container}>
        <View style={s.contentContainer}>

          <Text style={s.headerText}>Name: {user.data.firstName} {user.data.lastName}</Text>

          <Text>Phone #: {user.data.phoneNumber}</Text>
          

          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} style={s.textLink}>
            <Text style={s.textLinkText}>Edit Info</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")} style={s.textLink}>
            <Text style={s.textLinkText}>Change Password</Text>
          </TouchableOpacity>
        </View>


      </View>
    );
  }

}

function mapStateToProps(state) {
	const props = {
		user: state.user,
	};
	return props;
}

export default connect(mapStateToProps)(Profile);
