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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
    },
    contentContainer: {
        padding: 10,
    },
    headerText: {
        fontSize: Font.titleSize,
        textAlign: "center",
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
        overflow: "hidden",
    },
    regText: {
        fontSize: Font.normSize,
        fontWeight: Font.thin,
      },
    textLink: {
        paddingVertical: 10,
      },
    textLinkText: {
        fontSize: Font.butSize,
        color: Colors.buttonText,
        fontWeight: Font.thick,
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.sNorm,
        backgroundColor: Colors.sNorm,
        textAlign: 'center',
    },
    innerContainer: {
        padding: 10,
        width: "90%",
    },
});

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
            <View style={styles.container}>
            <Text style={[styles.headerText]}>Take This Job?</Text>
                <View style={styles.contentContainer}>
                    <View style={styles.jobItem}>
                        <Text style={styles.regText}>Job type: {this.state.jobType} </Text>
                        <Text style={styles.regText}>Posted by: {this.state.author} </Text>
                        <Text style={styles.regText}>Wage: ${this.state.wage} </Text>
                        <Text style={styles.regText}>Address: {this.state.address} </Text>
                        <Text style={styles.regText}>Description: {this.state.description} </Text>
                    </View>

                    <TouchableOpacity onPress={() => this.applyForJob()} style={styles.textLink}>
                        <Text style={styles.textLinkText}>Apply for this job</Text>
                    </TouchableOpacity>
             
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Main")} style={styles.textLink}>
                        <Text style={styles.textLinkText}>Cancel</Text>
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
