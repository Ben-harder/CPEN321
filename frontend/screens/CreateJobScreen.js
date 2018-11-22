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
} from 'react-native';
import { WebBrowser } from 'expo';
import axios from 'axios';
import { connect } from 'react-redux';
import api from "../constants/Url";
import Select from 'react-native-picker-select';
import JobTypes from '../constants/JobTypes';
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
        };

        this.attemptCreateJob = this.attemptCreateJob.bind(this);
    }

    componentDidMount() {
        // to do get new picker cause this one sucks
        console.disableYellowBox = true;
    }

    componentWillUnmount() {
        console.disableYellowBox = false;
    }

    render()
    {
        return (
            <View style={s.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessbile={false}>
                    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
                        <ScrollView style={s.jobList}>
                                <Text style={s.infoText}>Please complete the form below to create your job.</Text>

                                <View>
                                    <Text style={s.formLabel}>
                                        Address:
                                    </Text>
                                    <TextInput
                                        testID="#address"
                                        style={s.textInput}
                                        onChangeText={(address) => this.setState({ address })}
                                        returnKeyType='done'
                                        placeholder="Enter Address Here" />
                                </View>

                                <View>
                                    <Text style={s.formLabel}>
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
                                        placeholder="Enter Description Here" />
                                </View>

                                <View>
                                    <Text style={s.formLabel}>
                                        Wage in CAD:
                                    </Text>
                                    <TextInput
                                        testID="#wage"
                                        style={s.textInput}
                                        keyboardType={"numeric"}
                                        onChangeText={(wage) => this.setState({ wage })}
                                        returnKeyType='done'
                                        placeholder="Enter Wage here" />
                                </View>

                                <View>
                                    <Text style={s.formLabel}>
                                        Job type:
                                    </Text>
                                    <Select
                                            testID="#type"
                                            onValueChange={value => this.setState({jobType: value})}
                                            items={JobTypes}
                                            placeholder={{label:"Select Job Here", value: ""}}
                                    />
                                </View>

                                <TouchableOpacity testID="#submit" onPress={() => this.attemptCreateJob()} style={s.textLink}>
                                    <Text style={s.textLinkText}>Submit</Text>
                                </TouchableOpacity>
                                
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
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
            axios.post(`${api}/create-job`, {
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
