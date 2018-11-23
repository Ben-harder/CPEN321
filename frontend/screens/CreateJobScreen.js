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
    Keyboard,
    ImageBackground,
} from 'react-native';
import { WebBrowser } from 'expo';
import axios from 'axios';
import { connect } from 'react-redux';
import api from "../constants/Url";
import Select from 'react-native-picker-select';
import Colors from '../constants/Colors';
import Font from '../constants/Font';

import { MonoText } from '../components/StyledText';

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
        };

        this.attemptCreateJob = this.attemptCreateJob.bind(this);
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
                jobTypes: jobTypes
            });
        }).catch((err) =>
        {
            console.log(err);
        });
    }

    componentWillUnmount() {
        console.disableYellowBox = false;
    }

    render()
    {
        return (
            <View style={s.container}>
                <ImageBackground source={require('../assets/images/min_art1.png')} style={{width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}  resizeMode='cover'> 
                
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessbile={false}>
                        <View style={s.innerContainer}>
                            <View>
                                <Text style={s.regText}>
                                    Address:
                                </Text>
                                <TextInput
                                    testID="#address"
                                    style={s.textInput}
                                    onChangeText={(address) => this.setState({ address })}
                                    returnKeyType='done'
                                    placeholder="Ex: 1234 Address Rd" 
                                    underlineColorAndroid='transparent'
                                    />
                            </View>

                            <View>
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

                            <View>
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

                            <View>
                                <Text style={s.regText}>
                                    Job type:
                                </Text>
                                <View style={s.picker}>
                                    <Select
                                        testID="#type"
                                        onValueChange={value => this.setState({jobType: value})}
                                        items={this.state.jobTypes}
                                        placeholder={{label:"Select Job Here", value: ""}}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity testID="#submit" onPress={() => this.attemptCreateJob()} style={s.textLink}>
                                <Text style={s.textLinkText}>Submit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Main")} style={s.textLink}>
                                <Text style={s.textLinkTextBack}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </View>
        );
    }

    attemptCreateJob()
    {
        const { address, description, jobType, wage } = this.state;

        if (address.toString() == "Address" || description.toString() == "Description"
            || address.toString().length <= 0 || description.toString().length <= 0 ||
            wage.toString().length <= 0)
        {
            alert("Please ensure you've field out the fields.");
        }
        else if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(wage))
        {
            alert("Wage must be a valid format!");
        }
        else if (!/^\s*\S+(?:\s+\S+){2}/.test(address) || !/^[a-zA-Z 0-9\.\-]*$/.test(address))
        {
            alert("Address must be a valid address!");
        }
        else
        {
            axios.post(`${api}/job/create-job`, {
                address: address,
                description: description,
                jobType: jobType,
                wage: wage,
                employerID: this.props.user.data.ID,
            }).then((res) => {
                alert("You've successfully created the job post.");
                this.props.navigation.navigate("App");
            }).catch((err) => {
                // console.log(err);
                alert(err.response.data.errorMessage);
            });
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
