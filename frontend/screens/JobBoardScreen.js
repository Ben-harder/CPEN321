import React from 'react';
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
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { WebBrowser } from 'expo';
import axios from 'axios';
import api from "../constants/Url";

import { MonoText } from '../components/StyledText';

export default class JobBoardScreen extends React.Component
{
    _isMounted = false;
    
    static navigationOptions = {
        header: null,
    };

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
        axios.get(`${api}/jobList`).then((response) => {
            // console.log(response.data);
            if (this._isMounted)
                this.setState({jobList: response.data});
        }).catch((err) => {
            console.log(err);
        });
    }

    goToJobDetails(job)
    {
        this.props.navigation.navigate('Job', {
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
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.headerText}>Job Board</Text>

                    <FlatList
                        style={styles.jobList}
                        data={this.state.jobList}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.jobItem} onPress={() => this.goToJobDetails(item.value)}>
                                <Text>Job type: {item.value.jobType}</Text>
                                <Text>Posted by: {item.value.author}</Text>
                                <Text>Address: {item.value.address}</Text>
                                <Text>Wage: ${item.value.wage}</Text>
                                <Text>Description: {item.value.description}</Text>
                                <Text>JobID: {item.value.jobID}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </ScrollView>
            </View>
        );
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
    headerText: {
        fontSize: 24,
        textAlign: 'center',
    },
    jobList: {
        width: "100%",
        padding: 10,
        flex: 1,
    },
    jobItem: {
        marginTop: 10,
        backgroundColor: "rgba(0,0,0,0.05)",
        padding: 30,
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: { height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          android: {
            elevation: 20,
          },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
      },
});