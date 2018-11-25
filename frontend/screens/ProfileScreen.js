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
import IOSIcon from "react-native-vector-icons/Ionicons";

// components
import Loading from "../components/Loading";
import Colors from "../constants/Colors";

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
      <View style={[s.container, {justifyContent: 'flex-end'}]}>
        <View style={[s.contentContainer, {flex: 1, alignItems: 'center', justifyContent: 'space-around', paddingBottom: 20}]}>
            <Image source={{ uri: placeholderImage }} style={s.profilePicture} />
            <Text style={[s.regTextBold, {textAlign: 'left'}]}> {user.data.firstName} {user.data.lastName} </Text>
            <Text style={[s.infoText, {color: Colors.sNorm, textAlign: 'left'}]}>{user.data.phoneNumber}</Text>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <View style={{flexDirection: 'row'}}>
                <IOSIcon name={'ios-thumbs-up'} size={30} color={Colors.sDark}/>
                <Text style={[s.regText, {textAlign: 'left'}]}> {this.state.upVotes}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <IOSIcon name={'ios-thumbs-down'} size={30} color={Colors.sDark}/>
                <Text style={[s.regText, {textAlign: 'left'}]}> {this.state.downVotes}</Text>
              </View>
            </View>
        </View>
        <View style={[s.contentContainer, {flex: 1, justifyContent: 'space-between', alignItems: 'center', width: '100%', backgroundColor: Colors.sLight}]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
            <View style={{alignItems: 'center',}}>
              <Text style={[s.regText, {}]}>{this.state.numOfTakenJobs}</Text>
              <Text style={[s.infoText]}> Taken Jobs </Text>
            </View>
            
            <View style={{alignItems: 'center'}}>
              <Text style={[s.regText, {}]}>{this.state.numOfPostedJobs}</Text>
              <Text style={[s.infoText]}> Posted Jobs </Text>
            </View>
          </View>

          <View style={{width: '90%', paddingBottom: 20, justifyContent: 'space-evenly'}}> 
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
