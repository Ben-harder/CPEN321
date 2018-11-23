import React from "react";
import
{
    Text,
    TouchableOpacity,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-input";
import api from "../constants/Url";
import axios from "axios";

// styles
const s = require('../constants/style');

class EditProfile extends React.Component
{
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: ""
    };

    this.save = this.save.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;

    this.setState({
      firstName: user.data.firstName,
      lastName: user.data.lastName
    });
  }

  save() {
    const { user } = this.props;

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
        this.props.navigation.navigate("ProfileDetails");
      }).catch((err) => {
        console.log(err);
        alert(err.response.data.errorMessage);
      });
    } else {
      alert("Please enter a valid phone number!");
    }
  }

  render() {
    const { user, navigation } = this.props;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={s.container}>
          <ImageBackground source={require('../assets/images/min_art1.png')} style={{width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}  resizeMode='cover'> 
            
            <View style={s.contentContainer}>
              <View>
                <Text style={s.formLabel}>Phone #:</Text>
                <PhoneInput style={{backgroundColor: '#ffffff99', padding: 20, borderRadius: 10,}}
                    ref={ref => {
                      this.phone = ref;
                    }}
                    initialCountry="ca"
                    value={user.data.phoneNumber}
                  />
              </View>
              
              <View>
                <Text style={s.formLabel}>First Name:</Text>
                <TextInput
                  style={s.textInput}
                  onChangeText={(text) => this.setState({firstName: text})}
                  value={this.state.firstName}
                  returnKeyType='done'
                />
              </View>

              <View>
                <Text style={s.formLabel}>Last Name:</Text>
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
          </ImageBackground>
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

export default connect(mapStateToProps)(EditProfile);
