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
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import Font from "../constants/Font";

var s = require('../constants/style');

class EmployerJobsScreen extends React.Component
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
        axios.get(`${api}/get-employer-jobs`, {
            params: {
                employer: this.props.user.data.ID,
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
            jobType: job.job_title,
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
                            <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                                <Text style={[s.jobText, {fontSize: Font.titleSize}]}>{item.job_title}</Text> 
                                <Text style={[{fontSize: Font.titleSize,}]}>${item.wage}</Text>
                            </View>
                            <Text style={[s.infoText, {textAlign: 'left', borderBottomWidth: 1, borderBottomColor: Colors.sDark, padding: 10,}]}>@ {item.address}</Text>
                            <Text style={{fontSize: Font.smallSize}}>
                                    <Text><Text style={{fontWeight: 'bold'}}>Posted by: </Text><Text>{item.author}</Text></Text>
                            </Text>
                            <View>
                                <Text style={[s.jobText, {fontWeight: 'bold', marginTop: 30}]}>Description: </Text>
                                <View style={s.jobDescription}>
                                    <Text>{item.description}</Text>
                                </View>                     
                            </View>                    
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

export default connect(mapStateToProps)(EmployerJobsScreen);
