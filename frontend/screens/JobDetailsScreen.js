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
import IOSIcon from "react-native-vector-icons/Ionicons";


import { MonoText } from "../components/StyledText";

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
            buttonText: "",
            source: "Main"
        }
    }

    componentDidMount() {
        const { user, navigation } = this.props;

        this.setState({
            jobType: navigation.getParam("jobType", "NO JOB TYPE"),
            author: navigation.getParam("author", "NO AUTHOR"),
            description: navigation.getParam("description", "NO DESCRIPTION"),
            wage: navigation.getParam("wage", "NO WAGE"),
            address: navigation.getParam("address", "NO ADDRESS"),
            jobID: navigation.getParam("jobID", "NO JOBID"),
            showAction: navigation.getParam("showAction", false),
            buttonText: navigation.getParam("buttonText", "NO BUTTON TEXT"),
            source: navigation.getParam("source", "Main")
        });
    }

    render()
    {
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
                    </View>

                    <TouchableOpacity onPress={() => this.applyForJob()} style={s.textLink}>
                        <Text style={s.textLinkText}>{this.state.buttonText}</Text>
                    </TouchableOpacity>
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

export default connect(mapStateToProps)(JobDetailsScreen);
