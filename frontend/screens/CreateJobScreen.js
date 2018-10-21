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
    TextInput,
    Picker,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class CreateJobScreen extends React.Component
{
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            address: "Address",
            description: "Description",
            jobType: "Job Type",
            wage: "Job Wage"};
    }
    render()
    {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.titleText}>Create Job</Text>

                    <Text style={styles.infoText}>Please complete form below to create your job.</Text>
                    
                    {/* Job creater needs to input: job type, address, description */}

                    <TextInput
                        style={styles.textInput} 
                        onChangeText={(address) => this.setState({address})}
                        value={this.state.address}/>

                    <TextInput
                        style={styles.textInput}
                        onChangeText={(description) => this.setState({description})}
                        value={this.state.description}/>

                    <Text style={styles.formLabel}>
                    Job type:
                    </Text>
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: "80%"}}
                        mode='dropdown'
                        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                        <Picker.Item label="Mow lawn" value="Mow lawn"/>
                        <Picker.Item label="Feed lizard" value="Feed lizard"/>
                        <Picker.Item label="Do homework" value="Do homework"/>
                        <Picker.Item label="Clean pool" value="Clean pool"/>
                    </Picker>

                    <View style={[{ marginTop: 10, width: "70%" }]}>
                        <Button
                            title="Submit"
                            onPress={this._handleSubmit}
                        />
                    </View>

                    <View style={[{ marginTop: 10, width: "70%" }]}>
                        <Button
                            title="Cancel"
                            onPress={() => { this.props.navigation.navigate("App") }}
                        />
                    </View>

                </ScrollView>
            </View>
        );
    }

    _handleSubmit() {
        alert("Submit");
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleText: {
        fontSize: 20,
    },
    formLabel: {
        fontSize: 18,
        color: '#000000',
        marginTop: 10,
        textAlign: 'center',
    },
    infoText: {
        marginTop: 10,
        fontSize: 18,
        color: 'rgba(0,0,0,0.4)',
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 50,
        alignItems: "center",
    },
    textInput: {
        height: 40,
        width: "90%",
    }
});