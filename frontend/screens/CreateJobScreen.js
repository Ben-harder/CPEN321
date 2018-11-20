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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleText: {
        fontSize: Font.titleSize,
        paddingBottom: 20,
    },
    formLabel: {
        paddingBottom: 10,
        fontSize: Font.normSize,
        color: '#000000',
        marginTop: 10,
        textAlign: 'center',
    },
    infoText: {
        marginTop: 10,
        fontSize: 18,
        paddingBottom: 20,
        color: Colors.pLight,
        textAlign: 'center',
    },
    contentContainer: {
        alignItems: "center",
    },
    textInputJobDescription: {
        height: 100,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        borderColor: Colors.sNorm,
        backgroundColor: Colors.tile,
        overflow: 'hidden',
        width: "90%",
    },
    textInput: {
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        borderColor: Colors.sNorm,
        backgroundColor: Colors.tile,
        overflow: 'hidden',
        width: "90%",
    },
    button: {
        fontSize: Font.butSize,
        fontWeight: Font.thick,
    },
    buttonWrapper: {
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.sNorm,
        backgroundColor: Colors.sNorm,
        overflow: 'hidden',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: "90%",
    }
});

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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessbile={false}>
                <ScrollView style={styles.container}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.titleText}>Create Job</Text>

                        <Text style={styles.infoText}>Please complete the form below to create your job.</Text>

                        {/* Job creater needs to input: job type, address, description */}

                        <Text style={styles.formLabel}>
                            Address:
                        </Text>

                        <TextInput
                            testID="#address"
                            style={styles.textInput}
                            onChangeText={(address) => this.setState({ address })}
                            returnKeyType='done'
                            placeholder="Enter Address Here" />

                        <Text style={styles.formLabel}>
                            Job description:
                        </Text>

                        <TextInput
                            testID="#description"
                            style={styles.textInputJobDescription}
                            multiline = {true}
                            numberOfLines = {4}
                            onChangeText={(description) => this.setState({ description })}
                            returnKeyType='done'
                            blurOnSubmit={true}
                            placeholder="Enter Description Here" />

                        <Text style={styles.formLabel}>
                            Wage in CAD:
                        </Text>

                        <TextInput
                            testID="#wage"
                            style={styles.textInput}
                            keyboardType={"numeric"}
                            onChangeText={(wage) => this.setState({ wage })}
                            returnKeyType='done'
                            placeholder="Enter Wage here" />

                        <Text style={styles.formLabel}>
                            Job type:
                        </Text>
                        <Select
                            testID="#type"
                            onValueChange={value => this.setState({jobType: value})}
                            items={JobTypes}
                            placeholder={{label:"     Select Job Here", value: ""}}
                        />
                        <View style={styles.buttonWrapper}>
                            <Button
                                testID="#submit"
                                title="Submit"
                                onPress={this.attemptCreateJob}
                                style={styles.button}
                                color={Colors.buttonText}
                            />
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
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
