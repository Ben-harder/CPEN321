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
import { connect } from "react-redux";
import axios from "axios";
import api from "../constants/Url";
import Colors from "../constants/Colors";
import Font from "../constants/Font";

import { MonoText } from "../components/StyledText";

var s = require('../constants/style');

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
            jobType: navigation.getParam("jobType", "NO JOB TYPE"),
            author: navigation.getParam("author", "NO AUTHOR"),
            description: navigation.getParam("description", "NO DESCRIPTION"),
            wage: navigation.getParam("wage", "NO WAGE"),
            address: navigation.getParam("address", "NO ADDRESS"),
            jobID: navigation.getParam("jobID", "NO JOBID")
        });
    }

    applyForJob()
    {
        axios.get(`${api}/job/can-apply`, {
            params: {
                jobID: this.state.jobID,
                userID: this.props.user.data.ID
            }
        }).then((res) => {
            axios.post(`${api}/job/apply`, {
                userID: this.props.user.data.ID,
                jobID: this.state.jobID
            }).then((res) => {
                alert("You applied to the job successfuly.");
                this.props.navigation.navigate("Main");
            }).catch((err) => {
                console.log(err);
                alert(err.response.data.errorMessage);
            });
        }).catch((err) => {
            console.log(err);
            alert(err.response.data.errorMessage);
        });
        
    }

    render()
    {
        return (
            <View style={s.container}>
                <Text style={[s.headerText]}>Take This Job?</Text>
                <View style={s.contentContainer}>
                    <View style={s.jobItem}>
                            <Text style={s.jobText}><Text style={{fontWeight: 'bold'}}>Job type: </Text><Text>{this.state.jobType}</Text></Text>
                            <Text style={s.jobText}><Text style={{fontWeight: 'bold'}}>Posted by: </Text><Text>{this.state.author}</Text></Text>
                            <Text style={s.jobText}><Text style={{fontWeight: 'bold'}}>Address: </Text><Text>{this.state.address}</Text></Text>
                            <Text style={s.jobText}><Text style={{fontWeight: 'bold'}}>Wage: </Text><Text>${this.state.wage}</Text></Text>
                            <Text style={s.jobText}><Text style={{fontWeight: 'bold'}}>Description: </Text><Text>{this.state.description}</Text></Text>
                    </View>

                    <TouchableOpacity onPress={() => this.applyForJob()} style={s.textLink}>
                        <Text style={s.textLinkText}>Apply for this job</Text>
                    </TouchableOpacity>
            
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Main")} style={s.textLink}>
                        <Text style={s.textLinkText}>Cancel</Text>
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

export default connect(mapStateToProps)(JobScreen);
