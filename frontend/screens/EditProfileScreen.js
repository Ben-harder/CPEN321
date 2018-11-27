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
    Image,
} from "react-native";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import PhoneInput from "react-native-phone-input";
import api from "../constants/Url";
import axios from "axios";
import { ImagePicker, Permissions } from 'expo';
import Colors from "../constants/Colors";
import styles from '../constants/KeyboardStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// actions
import * as actions from "../actions/";

// styles
const s = require('../constants/style');

const placeholderImage = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

class EditProfile extends React.Component
{
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      image: "",
    };

    this.save = this.save.bind(this);
    this.pickImage = this.pickImage.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;

    this.setState({
      firstName: user.data.firstName,
      lastName: user.data.lastName,
    });
  }
  
  pickImage = async () => {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);

    if (permission.status === 'granted') {
        const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (newPermission.status === 'granted') {
          let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
          });
      
          if (!result.cancelled) {
            // set the image
            this.setState({ image: result.uri });

            // TODO save the image to the database
          }
        }
    } else {
      alert("You will to need to accept permissions to upload an image!");
    }
  };

  save() {
    const { user } = this.props;
    const { state, setParams, navigate } = this.props.navigation;
    const params = state.params || {};

    if (!this.state.firstName || !this.state.lastName || !this.phone.getValue()) {
      alert("Please leave no fields blank!");
    }

    if (this.phone.isValidNumber()) {
      axios.post(`${api}/user/change-info`, {
        userID: user.data.ID,
        phoneNumber: this.phone.getValue(),
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }).then((res) => {
        alert("Successfully updated your info!");
        this.props.actions.userData(res.data);
        this.props.navigation.navigate("ProfileDetails");
        params.updateInformation(res.data);
      }).catch((err) => {
        console.log(err);
        console.log(err.repsonse.data.errorMessage);
        alert(err.response.data.errorMessage);
      });
    } else {
      alert("Please enter a valid phone number!");
    }
  }

  render() {
    const { user, navigation } = this.props;

    return (
      <KeyboardAwareScrollView
      style={{ backgroundColor: '#E1E2E1' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={s.container}>
            <View style={s.contentContainer}>
              <View style={{alignItems: 'center',}}>
                <Text style={s.regText}>Click to Change:</Text>
                <TouchableOpacity onPress={this.pickImage} style={[s.profilePicture, {backgroundColor: Colors.sLight}]}>
                  <Image source={{ uri: this.state.image ? this.state.image : placeholderImage }} style={s.profilePicture} />
                </TouchableOpacity>
              </View>
              
              <View>
                <Text style={s.regText}>Phone #:</Text>
                <PhoneInput style={{backgroundColor: '#F5F5F6', padding: 20, borderRadius: 10, marginVertical: 5,}}
                    ref={ref => {
                      this.phone = ref;
                    }}
                    initialCountry="ca"
                    value={user.data.phoneNumber}
                  />
              </View>
              
              <View>
                <Text style={s.regText}>First Name:</Text>
                <TextInput
                  style={s.textInput}
                  onChangeText={(text) => this.setState({firstName: text})}
                  value={this.state.firstName}
                  returnKeyType='done'
                />
              </View>

              <View>
                <Text style={s.regText}>Last Name:</Text>
                <TextInput
                  style={s.textInput}
                  onChangeText={(text) => this.setState({lastName: text})}
                  value={this.state.lastName}
                  returnKeyType='done'
                />
              </View>

              <TouchableOpacity onPress={this.save} style={s.textLink}>
                <Text style={s.textLinkText}>Save</Text>
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
