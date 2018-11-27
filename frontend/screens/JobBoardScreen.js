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
import { WebBrowser, MapView } from "expo";
import axios from "axios";
import api from "../constants/Url";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import IOSIcon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

import { MonoText } from "../components/StyledText";

// components
import Loading from "../components/Loading";
import JobItem from "../components/JobItem";

const s = require('../constants/style');

class JobBoardScreen extends React.Component
{
    _isMounted = false;

    constructor(props)
    {
        super(props);
        this.state = {
            jobList: [],
            loading: true
        }

        this.tryFetchJobList = this.tryFetchJobList.bind(this);
    }

    componentDidMount()
    {
        this._isMounted = true;
        this.tryFetchJobList();
        this.jobInterval = setInterval(this.tryFetchJobList, 10000);
    }

    componentWillUnmount()
    {
        this._isMounted = false;
        clearInterval(this.jobInterval);
    }

    tryFetchJobList() {
        // console.log("trying to fetch jobs...");
        axios.get(`${api}/job/get-all-jobs-ranked`, {
            params: {
                userID: this.props.user.data.ID,
            }
        }).then((response) => {
            // console.log(response.data);
            if (this._isMounted)
                this.setState({jobList: response.data, loading: false});
        }).catch((err) => {
            console.log(err.repsonse.data.errorMessage);
        });
    }

    goToJobDetails(job)
    {
        this.props.navigation.navigate("Job", {
            jobType: job.job_title,
            address: job.address,
            author: `${job.employer.first_name} ${job.employer.last_name}`,
            wage: job.wage,
            description: job.description,
            jobID: job._id,
            updateJobList: this.tryFetchJobList
        });
    }

    populateJobs()
    {
        if (this.state.jobList.length == 0)
        {
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[s.regText,]}> No jobs to view </Text>
                        <IOSIcon name="ios-sad" size={25} style={{color: Colors.sNorm, marginLeft: 5}}/>
                    </View>
                </View>
            );
        }
        else return (
            <FlatList
                style={s.jobList}
                data={this.state.jobList}
                renderItem={({ item }) => (
                    <TouchableOpacity style={s.jobItem} onPress={() => this.goToJobDetails(item)}>
                        <JobItem job={item} isEmployer={false}/> 
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
                    {this.populateJobs()}
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
	const props = {
		user: state.user,
	};
	return props;
}

export default connect(mapStateToProps)(JobBoardScreen);
