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
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import axios from "axios";
import api from "../constants/Url";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import IOSIcon from "react-native-vector-icons/Ionicons";

// actions
import * as actions from "../actions/";

// components
import Loading from "../components/Loading";

const s = require('../constants/style');

class JobDetailsScreen extends React.Component
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
            jobID: "",
            showAction: false,
            primaryButtonText: "",
            showPrimaryButton: false,
            secondaryButtonText: "",
            source: "Main",
            primarySource: "Main",
            inProgress: false,
            loading: false,
            isCompleted: false,
            isRated: false,
            employeeID: "",
        }

        this.primaryButtonAction = this.primaryButtonAction.bind(this);
        this.secondaryButtonAction = this.secondaryButtonAction.bind(this);
        this.activateJob = this.activateJob.bind(this);
        this.completeJob = this.completeJob.bind(this);
    }

    componentDidMount() {
        const { navigation } = this.props;

        this.setState({
            jobType: navigation.getParam("jobType", "NO JOB TYPE"),
            author: navigation.getParam("author", "NO AUTHOR"),
            description: navigation.getParam("description", "NO DESCRIPTION"),
            wage: navigation.getParam("wage", "NO WAGE"),
            address: navigation.getParam("address", "NO ADDRESS"),
            jobID: navigation.getParam("jobID", "NO JOBID"),
            showAction: navigation.getParam("showAction", false),
            primaryButtonText: navigation.getParam("primaryButtonText", "NO PRIMARY BUTTON TEXT"),
            showPrimaryButton: navigation.getParam("showPrimaryButton", false),
            secondaryButtonText: navigation.getParam("secondaryButtonText", "NO SECONDARY BUTTON TEXT"),
            source: navigation.getParam("source", "Main"),
            primarySource: navigation.getParam("primarySource", "Main"),
            inProgress: navigation.getParam("inProgress", false),
            isCompleted: navigation.getParam("isCompleted", false),
            isRated: navigation.getParam("isRated", false),
            employeeID: navigation.getParam("employeeID"),
        });
    }

    primaryButtonAction() {
        const { user, navigation } = this.props;

        this.props.navigation.navigate(this.state.primarySource, {
            jobID: this.state.jobID,
            userID: user.data.ID,
            activateJob: this.activateJob,
            employerID: navigation.getParam("employerID")
        });
    }

    secondaryButtonAction() {
        const { state, setParams, navigate } = this.props.navigation;
        const params = state.params || {};

        this.setState({ loading: true });

        let apiCall;
        // cancel job
        if (this.state.source === "EmployerJobs") {
            apiCall = `${api}/job/cancel-job`;
        } else if (this.state.source === "AppliedJobs") {
            apiCall = `${api}/job/cancel-application`;
        } else if (this.state.source === "ActiveJobs") {
            return this.completeJob();
        }

        if (apiCall) {
            axios.post(apiCall, {
                userID: this.props.user.data.ID,
                jobID: this.state.jobID
            }).then((res) => {
                this.setState({ loading: false });
                params.updateJobList();
                alert("You've successfully cancelled the job post.");
                this.props.navigation.navigate(this.state.source);
            }).catch((err) => {
                this.setState({ loading: false });
                console.log(err);
                alert(err.response.data.errorMessage);
            });
        }
    }

    completeJob() {
        const { state, setParams, navigate } = this.props.navigation;
        const params = state.params || {};

        this.setState({ loading: true });

        axios.post(`${api}/job/pay-employee`, {
            jobID: this.state.jobID,
            userID: this.props.user.data.ID
        }).then((res) => {
            this.props.actions.updateUserBalance(res.data.balance);
            axios.post(`${api}/job/complete-a-job`, {
                jobID: this.state.jobID
              }).then((res) => {
                this.setState({ loading: false });
                params.updateJobList();
                alert("You've successfully completed the job!");
                this.props.navigation.navigate(this.state.source);
              }).catch((err) => {
                this.setState({ loading: false });
                console.log(err);
                alert(err.response.data.errorMessage);
              });
        }).catch((err) => {
            this.setState({ loading: false });
            console.log(err);
            alert(err.response.data.errorMessage);
        });
    }

    activateJob() {
        this.setState({ inProgress: true });
    }

    rateJob(rating)
    {
        const { state, setParams, navigate } = this.props.navigation;

        const params = state.params || {};

        axios.post(`${api}/user/rate-user`, {
            userID: this.state.employeeID,
            rating: rating == 1 ? true : false,

        }).then((res) => {
            this.setState({ loading: false, isRated: true });
            params.updateJobList();
            alert("You've successfully rated this employee!");
        }).catch((err) => {
            this.setState({ loading: false });
            console.log(err);
            alert(err.response.data.errorMessage);
        });
    }

    render()
    {
        if (this.state.loading) return <Loading />;

        return (
            <View style={s.container}>
                <View style={[s.contentContainer]}>
                    <View style={s.jobItem}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                            <Text style={s.jobTypeText}>{this.state.jobType}</Text>
                            <Text style={[{fontSize: Font.titleSize,}]}>${this.state.wage}</Text>
                        </View>
                        
                        <View style={{flexDirection: 'row', paddingVertical: 10,}}>
                                    <IOSIcon name="ios-compass" size={30} style={{color: Colors.sDark}}/>
                                    <Text style={s.addressText}> {this.state.address} </Text> 
                        </View>

                        <Text style={{fontSize: Font.smallSize}}>
                                <Text style={{fontWeight: 'bold'}}>Posted by: </Text><Text>{this.state.author}</Text>
                        </Text>
                        
                        <View>
                            <Text style={[s.jobText, {fontWeight: 'bold', marginTop: 30}]}>Description: </Text>
                            <View>
                                <Text style={s.jobDescriptionText}>{this.state.description}</Text>
                            </View>                     
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Map", {
                            source: "JobDetails",
                            address: this.state.address,
                            description: this.state.description,
                            latitude: this.props.navigation.getParam("latitude", 0),
                            longitude: this.props.navigation.getParam("longitude", 0),
                        })} style={s.textLink}>
                            <Text style={[s.textLinkText, {backgroundColor: Colors.sDark}]}>View on Map</Text>
                        </TouchableOpacity>
                        {this.state.isCompleted && !this.state.isRated && 
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <TouchableOpacity onPress={() => this.rateJob(1)}>
                                <IOSIcon name="ios-thumbs-up" size={30} style={{color: Colors.sDark}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.rateJob(-1)}>
                                <IOSIcon name="ios-thumbs-down" size={30} style={{color: Colors.sDark}}/>
                            </TouchableOpacity>
                        </View>}
                    </View>
                    {(!this.state.inProgress && this.state.showPrimaryButton) &&
                    <TouchableOpacity onPress={() => this.primaryButtonAction()} style={s.textLink}>
                        <Text style={s.textLinkText}>{this.state.primaryButtonText}</Text>
                    </TouchableOpacity>}
                    {!this.state.inProgress &&
                    <TouchableOpacity onPress={() => this.secondaryButtonAction()} style={s.textLink}>
                        <Text style={s.textLinkText}>{this.state.secondaryButtonText}</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(this.state.source)} style={s.textLink}>
                        <Text style={s.textLinkTextBack}>Back</Text>
                    </TouchableOpacity>
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

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsScreen);
