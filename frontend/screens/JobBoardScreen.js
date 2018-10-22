import React from 'react';
import {
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

export default class JobBoardScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            jobList: [],
        }

        this.tryFetchJobList = this.tryFetchJobList.bind(this);
    }

    componentDidMount() {
        this.tryFetchJobList();
        this.jobInterval = setInterval(this.tryFetchJobList, 10000);
    }

    componentWillUnmount() {
        console.log("unmount"); // Not getting called.
        this.clearInterval(this.jobInterval);
    }

    tryFetchJobList() {
        console.log("trying to fetch jobs...");
        axios.get(`${api}/jobList`).then((response) => {
            console.log(response.data);
            this.setState({jobList: response.data});
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.headerText}>Job Board</Text>
                    
                    <FlatList
                        style={styles.jobList}
                        data={this.state.jobList}
                        renderItem={({item}) => (
                            <TouchableOpacity style={styles.jobItem} onPress={() => alert("wain")}>
                                <Text>Job type: {item.value[0].jobType}</Text>
                                <Text>Posted by: {item.value[4].author}</Text>
                                <Text>Address: {item.value[1].address}</Text>
                                <Text>Wage: ${item.value[2].wage}</Text>
                                <Text>Description: {item.value[3].description}</Text>
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
    }
});