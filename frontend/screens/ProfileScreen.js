import React from "react";
import
{
    Text,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import { connect } from "react-redux";
import api from "../constants/Url";
import axios from "axios";

// components
import Loading from "../components/Loading";

// styles
const s = require('../constants/style');

const placeholderImage = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

class Profile extends React.Component
{
  static navigationOptions = {
    title: "My Profile",
  };

  constructor(props) {
    super(props);

    this.state = {
      downVotes: 0,
      upVotes: 0,
      numOfTakenJobs: 0,
      numOfPostedJobs: 0,
      loading: true
    };

    this.getUserStats = this.getUserStats.bind(this);
  }

  componentDidMount() {
    this.getUserStats();
  }

  getUserStats() {
    const { user } = this.props;

    axios.get(`${api}/user/get-user-profile`, {
      params: {
        userID: user.data.ID
      }
    }).then((res) => {
      this.setState({
        downVotes: res.data.downVotes,
        upVotes: res.data.upVotes,
        numOfTakenJobs: res.data.numOfTakenJobs,
        numOfPostedJobs: res.data.numOfPostedJobs,
        loading: false
      });
    }).catch((err) => {
      console.log(err);
      alert(err.response.data.errorMessage);
    });
  }

  render() {
    const { user, navigation } = this.props;

    if (this.state.loading) return (<Loading />);

    return (
      <View style={s.container}>
        <View style={[s.contentContainer, {flex: 1, justifyContent: 'center'}]}>
          <View style={{alignItems: 'center'}}>
            <Image source={{ uri: placeholderImage }} style={s.profilePicture} />
          </View>
          <View style={{flexDirection: 'row', borderRadius: 10,}}>
            <Text style={[s.regTextBold, {textAlign: 'left'}]}>Name: </Text>
            <Text style={[s.regText, {textAlign: 'left'}]}>{user.data.firstName} {user.data.lastName}</Text>
          </View>

          <View style={{flexDirection: 'row', borderRadius: 10,}}>
            <Text style={[s.regTextBold, {textAlign: 'left'}]}>Phone #: </Text>
            <Text style={[s.regText, {textAlign: 'left'}]}>{user.data.phoneNumber}</Text>
          </View>

          <View style={{flexDirection: 'row', borderRadius: 10,}}>
            <Text style={[s.regTextBold, {textAlign: 'left'}]}>Upvotes: </Text>
            <Text style={[s.regText, {textAlign: 'left'}]}>{this.state.upVotes}</Text>
          </View>

          <View style={{flexDirection: 'row', borderRadius: 10,}}>
            <Text style={[s.regTextBold, {textAlign: 'left'}]}>Downvotes: </Text>
            <Text style={[s.regText, {textAlign: 'left'}]}>{this.state.downVotes}</Text>
          </View>

          <View style={{flexDirection: 'row', borderRadius: 10,}}>
            <Text style={[s.regTextBold, {textAlign: 'left'}]}># of Taken Jobs: </Text>
            <Text style={[s.regText, {textAlign: 'left'}]}>{this.state.numOfTakenJobs}</Text>
          </View>

          <View style={{flexDirection: 'row', borderRadius: 10,}}>
            <Text style={[s.regTextBold, {textAlign: 'left'}]}># of Posted Jobs: </Text>
            <Text style={[s.regText, {textAlign: 'left'}]}>{this.state.numOfPostedJobs}</Text>
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
