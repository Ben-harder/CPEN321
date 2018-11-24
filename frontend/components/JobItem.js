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
        let {jobType, address, first_name, last_name, wage} = this.props;
        
        return (
            <TouchableOpacity style={s.jobItem} onPress={() => this.goToJobDetails(item)}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                    <Text style={s.jobTypeText}>{jobType}</Text>
                    <Text style={[{fontSize: Font.titleSize,}]}>${wage}</Text>
                </View>

                <View style={{flexDirection: 'row', paddingVertical: 10,}}>
                    <IOSIcon name="ios-compass" size={30} style={{color: Colors.sDark}}/>
                    <Text style={s.addressText}> {address} </Text> 
                </View>
                <Text style={{fontSize: Font.smallSize}}>
                    <Text style={{fontWeight: 'bold'}}>Posted by: </Text><Text>{first_name} {last_name}</Text>
                </Text>
            </TouchableOpacity>
        );
        
    }
}