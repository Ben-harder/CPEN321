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
        let { job } = this.props;
        console.log(job);
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

                {job.is_active && !job.is_compeleted && 
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: Font.smallSize}}>
                        <Text style={{fontWeight: 'bold'}}> Taken by: </Text><Text>{job.employee.first_name} {job.employee.last_name} </Text>
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: Font.smallSize, color: Colors.sNorm, fontStyle: 'italic'}}> Active </Text>
                        <IOSIcon name="ios-timer" size={25} style={{color: Colors.sNorm}}/>
                    </View>
                </View>}
                {job.is_compeleted && 
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: Font.smallSize}}>
                        <Text style={{fontWeight: 'bold'}}> Taken by: </Text><Text>{job.employee.first_name} {job.employee.last_name} </Text>
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: Font.smallSize, color: Colors.sNorm, fontStyle: 'italic'}}> Completed </Text>
                        <IOSIcon name="ios-checkmark-circle" size={25} style={{color: Colors.sNorm}}/>
                    </View>
                </View>}
            </View>
        );
        
    }
}