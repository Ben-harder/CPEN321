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
            jobID: job._id
        });
    }

    render()
    {
        if (this.state.loading) return (<Loading />);
        return (
            <View style={s.container}>
                <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
                    <FlatList
                        style={s.jobList}
                        data={this.state.jobList}
                        renderItem={({ item }) => (
                            <JobItem jobType={item.job_title} address={item.address} first_name={item.employer.first_name} last_name={item.employer.last_name} wage={item.wage}/>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
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
