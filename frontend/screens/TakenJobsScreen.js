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
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import Font from "../constants/Font";

import { MonoText } from "../components/StyledText";

var s = require('../constants/style');

class TakenJobsScreen extends React.Component
{
    _isMounted = false;

    constructor(props)
    {
        super(props);
        this.state = {
            jobList: [],
        };

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

    tryFetchJobList()
    {
        // console.log("trying to fetch jobs...");
        axios.get(`${api}/job/get-taken-jobs`, {
            params: {
                employeeID: this.props.user.data.ID,
            }
        }).then((response) =>
        {
            // console.log(response.data);
            if (this._isMounted)
                this.setState({ jobList: response.data });
        }).catch((err) =>
        {
            console.log(err);
        });
    }

    goToJobDetails(job)
    {
        this.props.navigation.navigate("Job", {
            jobType: job.jobType,
            address: job.address,
            author: job.author,
            wage: job.wage,
            description: job.description,
            jobID: job.jobID,
        });
    }

    render()
    {
        return (
            <View style={s.container}>
                <FlatList
                    style={s.jobList}
                    data={this.state.jobList}
                    renderItem={({ item }) => (
                        <View style={s.jobItem}>
                            <Text style={s.regText}>Job type: {item.job_title}</Text>
                            <Text style={s.regText}>Posted by: {item.author}</Text>
                            <Text style={s.regText}>Address: {item.address}</Text>
                            <Text style={s.regText}>Wage: ${item.wage}</Text>
                            <Text style={s.regText}>Description: {item.description}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
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

export default connect(mapStateToProps)(TakenJobsScreen);
