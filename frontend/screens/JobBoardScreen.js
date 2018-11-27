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
import { WebBrowser, MapView, Location, Permissions } from "expo";
import axios from "axios";
import api from "../constants/Url";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import IOSIcon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';

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
            loading: true,
            viewList: true,
            showMap: false,
            location: { coords: {latitude: 0.1, longitude: 0.1} }
        }

        this.tryFetchJobList = this.tryFetchJobList.bind(this);
        this.showMap = this.showMap.bind(this);
        this.showList = this.showList.bind(this);
    }

    componentDidMount()
    {
        this._isMounted = true;
        this.tryFetchJobList();
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
            updateJobList: this.tryFetchJobList,
            latitude: job.latitude,
            longitude: job.longitude,
            location: {}
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

    async showMap() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        this.setState({ viewList: false });
        if (status !== 'granted') {
            alert("You need to turn on location to view map");
            this.setState({
                loading: false, viewList: true, showMap: false
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location, showMap: true });
    }

    showList() {
        this.tryFetchJobList();
        this.setState({
            viewList: true,
            showMap: false
        })
    }

    populateMarkers() {
        return this.state.jobList.map((job, index) => {
            return (
                <MapView.Marker
                    key={index}
                    coordinate={{
                    latitude: parseFloat(job.latitude),
                    longitude: parseFloat(job.longitude),
                    }}
                    onPress={() => this.goToJobDetails(job)}
                />
            );
        });
    }

    render()
    {
        let listStyle, mapStyle;
        if (this.state.viewList) {
            listStyle = s.activeTab;
            mapStyle = s.tab;
        }
        else {
            listStyle = s.tab;
            mapStyle = s.activeTab;
        }

        return (
            <View style={s.container}>
                <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <TouchableOpacity style={listStyle} onPress={this.showList}>
                            <Text style={s.regText}> List </Text>
                        </TouchableOpacity>    
                        
                        <TouchableOpacity style={mapStyle} onPress={this.showMap}>
                            <Text style={s.regText}> Map </Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.loading && <Loading />}
                    {(this.state.viewList && !this.state.loading) && 
                    <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
                        {this.populateJobs()}
                    </View>}
                    {(this.state.showMap && !this.state.loading) &&
                    <View style={{height: '100%', width: '100%'}}>
                        <MapView
                            style={{ flex: 1 }}
                            provider="google"
                            region={{
                                latitude: this.state.location.coords.latitude,
                                longitude: this.state.location.coords.longitude,
                                latitudeDelta: 0.0300,
                                longitudeDelta: 0.0200
                            }}
                        >
                            {this.populateMarkers()}
                        </MapView>
                    </View>}
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
