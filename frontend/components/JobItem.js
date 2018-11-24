import React, { Component } from 'react';
import
{
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import IOSIcon from "react-native-vector-icons/Ionicons";

const s = require('../constants/style');

export default class JobItem extends Component {
    render()
    {
        let {job} = this.props;
        
        return (
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                    <Text style={s.jobTypeText}>{job.job_title}</Text>
                    <Text style={[{fontSize: Font.titleSize,}]}>${job.wage}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 10,}}>
                    <IOSIcon name="ios-compass" size={30} style={{color: Colors.sDark}}/>
                    <Text style={s.addressText}> {job.address} </Text> 
                </View>
                <Text style={{fontSize: Font.smallSize}}>
                    <Text style={{fontWeight: 'bold'}}>Posted by: </Text><Text>{job.employer.first_name} {job.employer.last_name}</Text>
                </Text>
            </View>
        );
        
    }
}