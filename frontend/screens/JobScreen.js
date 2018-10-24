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
import { connect } from 'react-redux';
import axios from 'axios';
import api from "../constants/Url";

import { MonoText } from '../components/StyledText';

class JobScreen extends React.Component
{
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            jobType: "",
            author: "",
            description: "",
            wage: 0,
            address: "",
            jobID: ""
        }
    }

    componentDidMount() {
        const { navigation } = this.props;

        this.setState({
            jobType: navigation.getParam('jobType', 'NO JOB TYPE'),
            author: navigation.getParam('author', 'NO AUTHOR'),
            description: navigation.getParam('description', 'NO DESCRIPTION'),
            wage: navigation.getParam('wage', 'NO WAGE'),
            address: navigation.getParam('address', 'NO ADDRESS'),
            jobID: navigation.getParam('jobID', 'NO JOBID')
        });
    }

    applyForJob()
    {
        axios.post(`${api}/job/apply`, {
            userID: this.props.user.data.ID,
            jobID: this.state.jobID
        }).then((res) => {
            alert("You applied to the job successfuly.");
            this.props.navigation.navigate('JobBoard');
        }).catch((err) => {
            console.log(err);
            alert(err.response.data.errorMessage);
        });
    }

    render()
    {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.headerText}>Take Job</Text>

                    <Text>Job type: {this.state.jobType} </Text>
                    <Text>Posted by: {this.state.author} </Text>
                    <Text>Description: {this.state.description} </Text>
                    <Text>Wage: ${this.state.wage} </Text>
                    <Text>Address: {this.state.address} </Text>

                    <View style={[{ marginTop: 10, width: "70%" }]}>
                        <Button
                            title="Apply for this job"
                            onPress={() => { this.applyForJob() }}
                        />
                    </View>

                    <View style={[{ marginTop: 10, width: "70%" }]}>
                        <Button
                            title="Cancel"
                            onPress={() => { this.props.navigation.navigate('App') }}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    };

}

function mapStateToProps(state) {
	const props = {
		user: state.user,
	};
	return props;
}

export default connect(mapStateToProps)(JobScreen);

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
