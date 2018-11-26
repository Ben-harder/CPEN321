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
import { connect } from 'react-redux';
import axios from "axios";
import api from "../constants/Url";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import IOSIcon from "react-native-vector-icons/Ionicons";

// components
import Loading from "../components/Loading";
import JobItem from "../components/JobItem";

const s = require('../constants/style');

class EmployerJobsScreen extends React.Component
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
        axios.get(`${api}/job/get-employer-jobs`, {
            params: {
                employer: this.props.user.data.ID,
            }
        }).then((response) =>
        {
            // console.log(response.data);
            if (this._isMounted)
                this.setState({ jobList: response.data, loading: false });
        }).catch((err) =>
        {
            console.log(err.repsonse.data.errorMessage);
        });
    }

    goToJobDetails(job)
    {
        this.props.navigation.navigate("JobDetails", {
            jobType: job.job_title,
            address: job.address,
            author: `${job.employer.first_name} ${job.employer.last_name}`,
            wage: job.wage,
            description: job.description,
            jobID: job._id,
            showAction: true,
            showPrimaryButton: true,
            primaryButtonText: "View Applicants",
            secondaryButtonText: "Cancel Job",
            source: "EmployerJobs",
            updateJobList: this.tryFetchJobList,
            primarySource: "ApplicantList",
            inProgress: job.is_active
        });
    }

    populateJobs()
    {
        if (this.state.jobList.length == 0)
        {
            return (
                <View style={{flex: 1, justifyContent: 'center', width: '70%', alignItems: 'center'}}>
                        <Text style={[s.regText]}> Hit "Create Job" in the sidebar to create your first posting! </Text>
                        <IOSIcon name="ios-construct" size={60} style={{color: Colors.sNorm, paddingVertical: 10}}/>
                </View>
            );
        }
        else return (
            <FlatList
            style={s.jobList}
            data={this.state.jobList}
            renderItem={({ item }) => (
                <TouchableOpacity style={s.jobItem} onPress={() => this.goToJobDetails(item)}>
                    <JobItem job={item}/>
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
                    { this.populateJobs() }
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

export default connect(mapStateToProps)(EmployerJobsScreen);
