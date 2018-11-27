import React from "react";
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
} from "react-native";
import { StackNavigator } from "react-navigation";
import { WebBrowser } from "expo";
import axios from "axios";
import api from "../constants/Url";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { connect } from 'react-redux';
import IOSIcon from "react-native-vector-icons/Ionicons";
import ApplicantItem from '../components/ApplicantItem';

import { MonoText } from "../components/StyledText";

// components
import Loading from "../components/Loading";

const s = require('../constants/style');

class ApplicantListScreen extends React.Component
{
    _isMounted = false;

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: 'black',
            headerStyle: {backgroundColor: Colors.pBackground, marginRight: 0, marginLeft: 0, borderBottomWidth: 0, height: 60},
            headerLeft:(
                <TouchableOpacity onPress={() => navigation.navigate("JobDetails")}>
                    <IOSIcon name="ios-arrow-back" size={25} style={{color: 'black', paddingLeft: 15,}}/>
                </TouchableOpacity>
            ),
            title: 'Applicants',
        };
    };
    

    constructor(props)
    {
        super(props);
        this.state = {
            applicantList: [],
            loading: true,
            jobID: "",
            userID: ""
        }

        this.tryFetchApplicantList = this.tryFetchApplicantList.bind(this);
    }

    componentDidMount()
    {
        const { navigation } = this.props;
        this._isMounted = true;

        this.setState({
            jobID: navigation.getParam("jobID", "NO JOBID"),
            userID: navigation.getParam("userID", "NO USERID")
        });

        axios.get(`${api}/job/get-job-applicants`, {
            params: {
                jobID: navigation.getParam("jobID", "NO JOBID"),
                userID: navigation.getParam("userID", "NO USERID")
            }
        }).then((response) => {
            // console.log(response.data);
            if (this._isMounted) {
                this.setState({applicantList: response.data, loading: false});
                this.applicantInterval = setInterval(this.tryFetchApplicantList, 10000);
            }
        }).catch((err) => {
            console.log(err.repsonse.data.errorMessage);
        });
    }

    componentWillUnmount()
    {
        this._isMounted = false;
        clearInterval(this.applicantInterval);
    }

    tryFetchApplicantList() {
        const { navigation } = this.props;

        axios.get(`${api}/job/get-job-applicants`, {
            params: {
                jobID: navigation.getParam("jobID", "NO JOBID"),
                userID: navigation.getParam("userID", "NO USERID")
            }
        }).then((response) => {
            // console.log(response.data);
            if (this._isMounted)
                this.setState({applicantList: response.data});
        }).catch((err) => {
            console.log(err.repsonse.data.errorMessage);
        });
    }

    goToApplicantProfile(applicant)
    {
        const { navigation } = this.props;
        const { state, setParams, navigate } = this.props.navigation;
        const params = state.params || {};

        this.props.navigation.navigate("ApplicantProfile", {
            userProfile: false,
            userID: applicant._id,
            firstName: applicant.first_name,
            lastName: applicant.last_name,
            phoneNumber: applicant.phone_number,
            jobID: this.state.jobID,
            activateJob: params.activateJob,
            updateList: this.tryFetchApplicantList,
            employerID: navigation.getParam("employerID")
        });
    }

    populateApplicants()
    {
        if (this.state.applicantList.length == 0)
        {
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[s.regText]}> No applications yet </Text>
                        <IOSIcon name="ios-sad" size={25} style={{color: Colors.sNorm, marginLeft: 5}}/>
                    </View>
                </View>
            );
        }
        else return (
            <FlatList
                style={s.jobList}
                data={this.state.applicantList}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => this.goToApplicantProfile(item)}>
                        <ApplicantItem applicant={item}/>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }

    render()
    {
        if (this.state.loading) return (<Loading />);
        return (
            <View style={s.container}>
                <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
                    {this.populateApplicants()}
                </View>
            </View>
        );
    }
}

export default ApplicantListScreen;
