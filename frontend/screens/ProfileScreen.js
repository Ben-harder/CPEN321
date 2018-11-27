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
      loading: true,
      userProfile: true,
      userID: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      jobID: ""
    };

    this.getUserStats = this.getUserStats.bind(this);
    this.acceptApplicant = this.acceptApplicant.bind(this);
    this.declineApplicant = this.declineApplicant.bind(this);
    this.updateInformation = this.updateInformation.bind(this);
  }

  componentDidMount() {
    const { user, navigation } = this.props;

    this.getUserStats();
    this.setState({
      userProfile: navigation.getParam("userProfile", true),
      userID: navigation.getParam("userID", user.data.ID),
      firstName: navigation.getParam("firstName", user.data.firstName),
      lastName: navigation.getParam("lastName", user.data.lastName),
      phoneNumber: navigation.getParam("phoneNumber", user.data.phoneNumber),
      jobID: navigation.getParam("jobID", "NO JOBID")
    });
  }

  getUserStats() {
    const { user, navigation } = this.props;

    axios.get(`${api}/user/get-user-profile`, {
      params: {
        userID: navigation.getParam("userID", user.data.ID)
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

  updateInformation(user) {
    this.setState({
      firstName: user.first_name,
      lastName: user.last_name,
      phoneNumber: user.phone_number
    });
  }

  acceptApplicant() {
    const { navigation } = this.props;
    const { state, setParams, navigate } = navigation;
    const params = state.params || {};

    this.setState({
      loading: true
    });
    axios.post(`${api}/job/accept-an-applicant`, {
      jobID: this.state.jobID,
      userID: this.state.userID
    }).then((res) => {
      this.setState({
        loading: false
      });
      params.activateJob();
      navigation.navigate("JobDetails");
      alert("Successfully accepted the applicant");
    }).catch((err) => {
      this.setState({
        loading: false
      });
      alert(err.response.data.errorMessage);
    });
  }

  declineApplicant() {
    const { navigation } = this.props;
    const { state, setParams, navigate } = navigation;
    const params = state.params || {};

    this.setState({
      loading: true
    });
    axios.post(`${api}/job/cancel-application`, {
      jobID: this.state.jobID,
      userID: this.state.userID
    }).then((res) => {
      this.setState({
        loading: false
      });
      params.updateList();
      navigation.navigate("ApplicantList");
      alert("You have declined the applicant.");
    }).catch((err) => {
      this.setState({
        loading: false
      });
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
            <Text style={[s.regTextBold, {textAlign: 'left'}, { marginTop: 20, marginBottom: 10 }]}> {this.state.firstName} {this.state.lastName} </Text>
            <Text style={[s.infoText, {color: Colors.sNorm, textAlign: 'left', marginTop: 30, marginBottom: 45}]}>{this.state.phoneNumber}</Text>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20}}>
              <View style={{flexDirection: 'row'}}>
                <IOSIcon name={'ios-thumbs-up'} size={30} color={Colors.sDark}/>
                <Text style={[s.regText, {textAlign: 'left'}]}> {this.state.upVotes}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <IOSIcon name={'ios-thumbs-down'} size={30} color={Colors.sDark}/>
                <Text style={[s.regText, {textAlign: 'left'}]}> {this.state.downVotes}</Text>
              </View>
            </View>
            {this.state.userProfile &&
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30, marginBottom: 20}}>
                <Text style={[s.regText]}>Balance: ${user.data.balance}</Text>
            </View>}
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
          <View style={{width: '90%', paddingBottom: 20, marginBottom: 60, justifyContent: 'space-evenly'}}> 
            {this.state.userProfile &&
            <TouchableOpacity onPress={() => navigation.navigate("EditProfile", { updateInformation: this.updateInformation })} style={s.textLink}>
              <Text style={s.textLinkText}>Edit Info</Text>
            </TouchableOpacity>}

            {this.state.userProfile &&
            <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")} style={s.textLink}>
              <Text style={s.textLinkText}>Change Password</Text>
            </TouchableOpacity>}

            {!this.state.userProfile &&
            <TouchableOpacity onPress={this.acceptApplicant} style={s.textLink}>
              <Text style={s.textLinkText}>Accept</Text>
            </TouchableOpacity>}

            {!this.state.userProfile &&
            <TouchableOpacity onPress={this.declineApplicant} style={s.textLink}>
              <Text style={s.textLinkText}>Decline</Text>
            </TouchableOpacity>}

            {!this.state.userProfile &&
            <TouchableOpacity onPress={() => navigation.navigate("ApplicantList")} style={s.textLink}>
              <Text style={s.textLinkTextBack}>Back</Text>
            </TouchableOpacity>}
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
