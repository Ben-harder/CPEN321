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
    Picker,
    Modal,
    TouchableHighlight,
} from 'react-native';
import { WebBrowser } from 'expo';
import axios from 'axios';
import api from "../constants/Url";

import { MonoText } from '../components/StyledText';

export default class CreateJobScreen extends React.Component
{
    static navigationOptions = {
        header: null,
    };

    constructor(props)
    {
        super(props);
        this.state = {
            address: "Address",
            description: "Description",
            jobType: "Mow lawn",
            wage: "Job Wage",
            modalVisible: false,
        };

        this.attemptCreateJob = this.attemptCreateJob.bind(this);
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
                        placeholder={this.state.address} />

                    <Text style={styles.formLabel}>
                        Job description:
                    </Text>

                    <TextInput
                        style={styles.textInput}
                        onChangeText={(description) => this.setState({ description })}
                        placeholder={this.state.description} />

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

                    <Picker
                        selectedValue={this.state.jobType}
                        style={styles.picker}
                        mode={'dropdown'}
                        onValueChange={(itemValue) => this.setState({jobType: itemValue})}
                        >
                            <Picker.Item label="Mow lawn" value="Mow lawn"/>
                            <Picker.Item label="Feed lizard" value="Feed lizard"/>
                            <Picker.Item label="Do homework" value="Do homework"/>
                            <Picker.Item label="Clean pool" value="Clean pool"/>
                        </Picker>

                    <View style={styles.button}>
                        <Button
                            title="Submit"
                            onPress={this.attemptCreateJob}
                        />
                    </View>

                    <View style={styles.button}>
                        <Button
                            title="Cancel"
                            onPress={() => { this.props.navigation.navigate("App") }}
                        />
                    </View>

                </ScrollView>
            </View>
        );
    }

    attemptCreateJob()
    {
        var address = this.state.address;
        var description = this.state.description;
        var jobType = this.state.jobType;
        var wage = this.state.wage;

        if (address.toString() == "Address" || description.toString() == "Description"
            || address.toString().length <= 0 || description.toString().length <= 0 ||
            wage.toString().length <= 0)
        {
            alert("Pleases ensure you've field out the fields.");
        }
        else
        {
            axios.post(`${api}/job`, {
                address: address,
                description: description,
                jobType: jobType,
                wage: wage,
            });
        }

        // else alert("Pleases ensure you've field out the fields.");
    }
}

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
