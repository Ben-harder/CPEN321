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

import { MonoText } from "../components/StyledText";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contentContainer: {
        paddingTop: 30,
    },
    headerText: {
        fontSize: Font.titleSize,
        textAlign: "center",
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
    tabBarInfoContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
          ios: {
            shadowColor: "black",
            shadowOffset: { height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          android: {
            elevation: 20,
          },
        }),
        alignItems: "center",
        backgroundColor: "#fbfbfb",
        paddingVertical: 20,
      },
});

export default class JobBoardScreen extends React.Component
{
    _isMounted = false;

    constructor(props)
    {
        super(props);
        this.state = {
            jobList: [],
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
        axios.get(`${api}/get-all-jobs`).then((response) => {
            // console.log(response.data);
            if (this._isMounted)
                this.setState({jobList: response.data});
        }).catch((err) => {
            console.log(err);
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
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <FlatList
                        style={styles.jobList}
                        data={this.state.jobList}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.jobItem} onPress={() => this.goToJobDetails(item)}>
                                <Text style={styles.regText}>Job type: {item.job_title}</Text>
                                <Text style={styles.regText}>Posted by: {item.employer.first_name} {item.employer.last_name}</Text>
                                <Text style={styles.regText}>Address: {item.address}</Text>
                                <Text style={styles.regText}>Wage: ${item.wage}</Text>
                                <Text style={styles.regText}>Description: {item.description}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>
            </View>
        );
    }

}