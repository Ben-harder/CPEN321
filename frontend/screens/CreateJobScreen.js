import React from 'react';
import
{
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    TextInput,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import { WebBrowser } from 'expo';
import axios from 'axios';
import { connect } from 'react-redux';
import api from "../constants/Url";
import Select from 'react-native-picker-select';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import styles from '../constants/KeyboardStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// components
import Loading from "../components/Loading";

const s = require('../constants/style');

class CreateJobScreen extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            address: "",
            description: "",
            jobType: "",
            wage: "",
            jobTypes: [],
            loading: true,
            step: true,
            address: "",
            longitude: 0,
            latitude: 0
        };

        this.attemptCreateJob = this.attemptCreateJob.bind(this);
        this.inputAddress = this.inputAddress.bind(this);
    }

    componentDidMount() {
        // to do get new picker cause this one sucks
        console.disableYellowBox = true;

        // get job types
        axios.get(`${api}/job/get-job-types`).then((response) =>
        {
            let jobTypes = [];
            for (const i in response.data) {
                jobTypes[i] = {key: i, label: response.data[i], value: response.data[i]};
            } 
            this.setState({
                jobTypes: jobTypes,
                loading: false
            });
        }).catch((err) =>
        {
            console.log(err.repsonse.data.errorMessage);
        });
    }

    componentWillUnmount() {
        console.disableYellowBox = false;
    }

    attemptCreateJob()
    {
        const { address, description, jobType, wage, longitude, latitude } = this.state;

        if (description.toString() == "Description"
            || description.toString().length <= 0 ||
            wage.toString().length <= 0)
        {
            alert("Please ensure you've field out the fields.");
        }
        else if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(wage))
        {
            alert("Wage must be a valid format!");
        }
        else
        {
            this.setState({ loading: true });
            axios.post(`${api}/job/create-job`, {
                address: address,
                longitude: longitude,
                latitude: latitude,
                description: description,
                jobType: jobType,
                wage: wage,
                employerID: this.props.user.data.ID,
            }).then((res) => {
                this.setState({ loading: false });
                alert("You've successfully created the job post.");
                this.props.navigation.navigate("App");
            }).catch((err) => {
                // console.log(err.repsonse.data.errorMessage);
                this.setState({ loading: false });
                alert(err.response.data.errorMessage);
            });
        }
    }

    inputAddress() {
        if (this.state.address === "") {
            alert("Please enter an address!");
        } else {
            this.setState({
                step: false
            });
        }
    }

    render()
    {
        if (this.state.loading) return (<Loading />);
        if (this.state.step) {
            return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessbile={false} style={{height: '100%'}}>
                    <GooglePlacesAutocomplete
                        placeholder='Enter address'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            this.setState({
                                address: details.name,
                                longitude: details.geometry.location.lng,
                                latitude: details.geometry.location.lat,
                            });
                        }}
                        
                        getDefaultValue={() => ''}
                        listViewDisplayed={false}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyBqVTF8qnLz4TNCAR_GJeAj7_X6iEzcY00',
                            language: 'en', // language of the results
                            types: 'geocode' // default: 'geocode'
                        }}
                        
                        styles={{
                            textInputContainer: {
                                width: '100%',
                                height: 60
                            },
                            textInput: {
                                height: 40,
                                marginTop: 10
                            },
                            description: {
                                fontWeight: 'bold'
                            },
                        }}

                        renderRightButton={() => 
                        <TouchableOpacity onPress={() => this.inputAddress()} style={s.textLink}>
                            <Text style={[s.textLinkText, {marginRight: 10}]}>Next</Text>
                        </TouchableOpacity>}
                        
                        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list

                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    />
                </TouchableWithoutFeedback>
            );
        } else {
            return (
                <KeyboardAwareScrollView
                style={{ backgroundColor: '#E1E2E1' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={true}>
                <View style={s.container}>           
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessbile={false}>
                        <View style={s.innerContainer}>
                            <View style={{marginBottom: 40}}>
                                <Text style={s.regText}>
                                    Job description:
                                </Text>

                                <TextInput
                                    testID="#description"
                                    style={s.textInputJobDescription}
                                    multiline = {true}
                                    numberOfLines = {4}
                                    onChangeText={(description) => this.setState({ description })}
                                    returnKeyType='done'
                                    blurOnSubmit={true}
                                    placeholder="Enter Description Here" 
                                    underlineColorAndroid='transparent'
                                    />
                            </View>
                            <View style={{marginBottom: 40}}>
                                <Text style={s.regText}>
                                    Wage in CAD:
                                </Text>
                                <TextInput
                                    testID="#wage"
                                    style={s.textInput}
                                    keyboardType={"numeric"}
                                    onChangeText={(wage) => this.setState({ wage })}
                                    returnKeyType='done'
                                    placeholder="Enter Wage here" 
                                    underlineColorAndroid='transparent'
                                    />
                            </View>

                            <View style={{marginBottom: 40}}>
                                <Text style={s.regText}>
                                    Job type:
                                </Text>
                                <View style={s.picker}>
                                    <Select
                                        testID="#type"
                                        onValueChange={value => this.setState({jobType: value})}
                                        items={this.state.jobTypes}
                                        placeholder={{label:"Select Job Here", value: ""}}
                                        style={{inputIOS: { height: 50, paddingLeft: 10, color: '#000000' }}}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity testID="#submit" onPress={() => this.attemptCreateJob()} style={s.textLink}>
                                <Text style={[s.textLinkText, { marginBottom: 20 }]}>Submit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Main")} style={s.textLink}>
                                <Text style={[s.textLinkTextBack, {marginBottom: 20}]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                </KeyboardAwareScrollView>
            );
        }
    }
}

function mapStateToProps(state) {
	const props = {
		user: state.user,
	};
	return props;
}

export default connect(mapStateToProps)(CreateJobScreen);
