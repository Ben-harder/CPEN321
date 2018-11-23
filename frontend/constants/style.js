'use strict';

var React = require('react-native');
import Font from "../constants/Font";
import Colors from "../constants/Colors";


var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#E1E2E1',
        flexDirection: 'column',
    },
    textLink: {
       paddingVertical: 10,
    },
    textLinkTextBack: {
        fontSize: Font.butSize,
        color: Colors.sNorm,
        fontWeight: Font.thick,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#ffff',
        borderColor: Colors.sNorm,
        borderWidth: 1,
        overflow: "hidden",
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    textLinkText: {
        fontSize: Font.butSize,
        color: Colors.buttonText,
        fontWeight: Font.thick,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.sNorm,
        overflow: "hidden",
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    textLinkTextAlt: {
        fontSize: Font.butSize,
        color: Colors.buttonText,
        fontWeight: Font.thick,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.sNormAlt,
        overflow: "hidden",
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    innerContainer: {
        width: "100%",  
        padding: 20,
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    authContainer: {
        width: "100%",  
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    contentContainer: {
        paddingTop: 30,
        width: "90%",
    },
    headerText: {
        fontSize: Font.titleSize,
        textAlign: "center",
        // padding: 20,
    },
    welcomeText: {
        fontSize: 45,
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    jobTypeText: {
        textAlign: 'left',
        fontSize: Font.normSize,
    },
    regText: {
        textAlign: 'center',
        fontSize: Font.normSize,
    },
    addressText: {
        fontStyle: 'normal', 
        textAlign: 'left', 
        fontSize: Font.normSize,
        color: Colors.sDark,
    },
    addressTextAlt: {
        fontStyle: 'normal', 
        textAlign: 'left', 
        fontSize: Font.normSize,
        color: Colors.sNormAlt,
    },
    regTextBold: {
        textAlign: 'center',
        fontSize: Font.normSize,
        fontWeight: 'bold',
    },
    infoText: {
        textAlign: 'center',
        fontSize: Font.normSize,
        color: Colors.sLight,
        fontStyle: 'italic',
    },
    jobText: {
        textAlign: 'left',
        fontSize: Font.normSize,
    },
    textInput: {
        backgroundColor: '#F5F5F6', 
        padding: 20, 
        borderRadius: 10,
        marginVertical: 5,
    },
    textInputJobDescription: {
        height: 100,
        backgroundColor: '#F5F5F6', 
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden',
        width: "100%",
        marginVertical: 5,
    },
    picker: {
        backgroundColor: '#F5F5F6',
        padding: 5, 
        borderRadius: 10,
        marginVertical: 5,
    },
    jobDescription: {
        // padding: 10,
        // borderWidth: 1,
        // borderRadius: 7,
        // borderColor: Colors.sNorm,
    },
    jobList: {
        marginTop: 20,
        width: "90%",
        flex: 1,
    },
    jobItem: {
        borderRadius: 20,
        // borderWidth: 1,
        borderColor: 'white',
        marginVertical: 8,  
        backgroundColor: '#F5F5F6',
        padding: 20,
        overflow: "hidden",
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 1,
    },
    
});