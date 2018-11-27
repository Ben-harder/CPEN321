import React, { Component } from 'react';
import
{
    Text,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import IOSIcon from "react-native-vector-icons/Ionicons";

const placeholderImage = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

const s = require('../constants/style');

export default class ApplicantItem extends Component {
    render()
    {
        let {applicant} = this.props;
        
        return (
            <View style={[s.jobItem, {width: '100%', flexDirection: 'row', justifyContent: 'space-between'}]}>
                <Image source={{ uri: placeholderImage }} style={[s.profilePicture, {width: 75, height: 75}]} />
                <View style={{justifyContent: 'center'}}>
                    <Text style={[s.jobTypeText, {marginBottom: 10}]}> {applicant.first_name.charAt(0).toUpperCase()}. {applicant.last_name} </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <View style={{flexDirection: 'row'}}>
                            <IOSIcon name={'ios-thumbs-up'} size={30} color={Colors.sDark}/>
                            <Text style={[s.regTextBold, {marginRight: 15}]}> {applicant.up_votes} </Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <IOSIcon name={'ios-thumbs-down'} size={30} color={Colors.sDark}/>
                            <Text style={[s.regTextBold]}> {applicant.down_votes} </Text>
                        </View>
                    </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                    
                </View>
            </View>
        );
        
    }
}