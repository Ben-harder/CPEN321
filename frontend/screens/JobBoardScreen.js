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
                        renderItem={({item}) => <Text style={styles.jobItem}>{item.key}</Text>}
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
        paddingLeft: 30,
    },
    jobItem: {
        fontSize: 18,
        padding: 10,
    }
});