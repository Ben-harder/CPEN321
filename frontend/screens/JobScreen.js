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
import Colors from '../constants/Colors';
import Font from '../constants/Font';

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
            this.props.navigation.navigate('Main');
        }).catch((err) => {
            console.log(err);
            alert(err.response.data.errorMessage);
        });
    }

    render()
    {
        return (
            <View style={styles.container}>
            <Text style={[styles.headerText]}>Take This Job?</Text>
                <View style={[styles.contentContainer, styles.jobItem]}>
                    <Text style={styles.regText}>Job type: {this.state.jobType} </Text>
                    <Text style={styles.regText}>Posted by: {this.state.author} </Text>
                    <Text style={styles.regText}>Wage: ${this.state.wage} </Text>
                    <Text style={styles.regText}>Address: {this.state.address} </Text>
                    <Text style={styles.regText}>Description: {this.state.description} </Text>
                </View>
                <View style={[styles.buttonWrapper, {alignSelf: "center", marginTop: 10, width: "70%" }]}>
                    <Button
                        title="Apply for this job"
                        onPress={() => { this.applyForJob() }}
                        color={Colors.buttonText}
                    />
                </View>
                <View style={[styles.buttonWrapper, {alignSelf: "center", marginTop: 10, marginBottom: 400, width: "70%" }]}>
                    <Button
                        title="Cancel"
                        onPress={() => { this.props.navigation.navigate('Main') }}
                        color={Colors.buttonText}
                    />
                </View>
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
        paddingTop: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 5,

    },
    contentContainer: {
        paddingTop: 20,
        marginBottom: 20,
    },
    headerText: {
        fontSize: Font.titleSize,
        textAlign: 'center',
        padding: 20,
    },
    jobList: {
        width: "100%",
        padding: 10,
        flex: 1,
    },
    jobItem: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.sNorm,
        marginTop: 10,
        backgroundColor: Colors.tile,
        padding: 30,
        overflow: 'hidden',
    },
    regText: {
        fontSize: Font.normSize,
        fontWeight: Font.thin,
      },
    buttonWrapper: {
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.sNorm,
        backgroundColor: Colors.sNorm,
        overflow: 'hidden',
    },
});
