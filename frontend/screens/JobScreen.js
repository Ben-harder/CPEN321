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
    AsyncStorage,
    FlatList,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { WebBrowser } from 'expo';
import axios from 'axios';
import api from "../constants/Url";

import { MonoText } from '../components/StyledText';

export default class JobScreen extends React.Component
{
    static navigationOptions = {
        header: null,
    };

    applyForJob(jobDetails)
    {
        axios.post(`${api}/applyForJob`, ).then(() => {
            alert("You applied to the job successfuly.");
            this.props.navigation.navigate('JobBoard');
        })
        // alert("You applied for job: " + jobDetails.jobID);
    }

    render()
    {
        const { navigation } = this.props;
        const jobType = navigation.getParam('jobType', 'NO JOB TYPE');
        const author = navigation.getParam('author', 'NO AUTHOR');
        const description = navigation.getParam('description', 'NO DESCRIPTION');
        const wage = navigation.getParam('wage', 'NO WAGE');
        const address = navigation.getParam('address', 'NO ADDRESS');
        const jobID = navigation.getParam('jobID', 'NO JOBID');

        const jobDetails = {
            jobType: jobType,
            author: author,
            description: description,
            wage: wage.toString(),
            address: address,
            jobID:jobID
        };


        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.headerText}>Take Job</Text>

                    <Text>Job type: {jobDetails.jobType} </Text>
                    <Text>Posted by: {jobDetails.author} </Text>
                    <Text>Description: {jobDetails.description} </Text>
                    <Text>Wage: ${jobDetails.wage} </Text>
                    <Text>Address: {jobDetails.address} </Text>
                    <Text>Job ID: {jobDetails.jobID} </Text>

                    <View style={[{ marginTop: 10, width: "70%" }]}>
                        <Button
                            title="Apply for this job"
                            onPress={() => { this.applyForJob(jobDetails) }}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        textAlign: 'center',
    },
    jobList: {
        width: "100%",
        padding: 10,
        flex: 1,
    },
    jobItem: {
        marginTop: 10,
        backgroundColor: "rgba(0,0,0,0.05)",
        padding: 30,
    },
});