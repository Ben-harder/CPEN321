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
} from 'react-native';
import { WebBrowser } from 'expo';
import axios from 'axios';
import { connect } from 'react-redux';
import api from "../constants/Url";
import Select from 'react-native-picker-select';
import JobTypes from '../constants/JobTypes';

import { MonoText } from '../components/StyledText';

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
            modalVisible: false,
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

    setModalVisible(visible)
    {
        this.setState({ modalVisible: visible });
    }

    render()
    {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.titleText}>Create Job</Text>

                    <Text style={styles.infoText}>Please complete the form below to create your job.</Text>

                    {/* Job creater needs to input: job type, address, description */}

                    <Text style={styles.formLabel}>
                        Address:
                    </Text>

                    <TextInput
                        style={styles.textInput}
                        onChangeText={(address) => this.setState({ address })}
                        placeholder="Address" />

                    <Text style={styles.formLabel}>
                        Job description:
                    </Text>

                    <TextInput
                        style={styles.textInput}
                        onChangeText={(description) => this.setState({ description })}
                        placeholder="Description" />

                    <Text style={styles.formLabel}>
                        Wage in CAD:
                    </Text>

                    <TextInput
                        style={styles.textInput}
                        keyboardType={"numeric"}
                        onChangeText={(wage) => this.setState({ wage })}
                        placeholder="Wage" />

                    <Text style={styles.formLabel}>
                        Job type:
                    </Text>
                    <Select
                        onValueChange={value => this.setState({jobType: value})}
                        items={JobTypes}
                        placeholder={{label: "Select Job Type...", value: ""}}
                    />
                    <View style={styles.button}>
                        <Button
                            title="Submit"
                            onPress={this.attemptCreateJob}
                        />
                    </View>
                </ScrollView>
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
            alert("Pleases ensure you've field out the fields.");
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
                console.log(err);
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleText: {
        fontSize: 20,
    },
    formLabel: {
        fontSize: 18,
        color: '#000000',
        marginTop: 10,
        textAlign: 'center',
    },
    infoText: {
        marginTop: 10,
        fontSize: 18,
        color: 'rgba(0,0,0,0.4)',
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 50,
        alignItems: "center",
    },
    textInput: {
        height: 40,
        width: "90%",
    },
    button: {
        marginTop: 20,
        width: "90%",
    },
    picker: {
        height: 50,
        width: "90%",
    }
});
