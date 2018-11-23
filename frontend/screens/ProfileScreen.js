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

  componentDidMount() {
    
  }

  render() {
    const { user, navigation } = this.props;

    return (
      <View style={s.container}>
        <View style={[s.contentContainer, {flex: 1, justifyContent: 'center'}]}>
          <View style={{flexDirection: 'row', borderRadius: 10,}}>
            <Text style={[s.regTextBold, {textAlign: 'left'}]}>Name: </Text>
            <Text style={[s.regText, {textAlign: 'left'}]}>{user.data.firstName} {user.data.lastName}</Text>
          </View>

          <View style={{flexDirection: 'row', borderRadius: 10,}}>
            <Text style={[s.regTextBold, {textAlign: 'left'}]}>Phone #: </Text>
            <Text style={[s.regText, {textAlign: 'left'}]}>{user.data.phoneNumber}</Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} style={s.textLink}>
              <Text style={s.textLinkText}>Edit Info</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")} style={s.textLink}>
              <Text style={s.textLinkText}>Change Password</Text>
            </TouchableOpacity>
          </View>
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
