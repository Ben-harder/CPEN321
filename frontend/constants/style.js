'use strict';

var React = require('react-native');
import Font from "./Font";
import Colors from "./Colors";


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
        color: Colors.sDark,
        fontWeight: Font.thick,
        padding: 10,
        borderRadius: 10,
        overflow: "hidden",
        textAlign: 'center',
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
        color: Colors.sNorm,
        fontStyle: 'italic',
    },
    jobText: {
        textAlign: 'left',
        fontSize: Font.normSize,
    },
    jobDescriptionText: {
        fontSize: Font.smallSize,
    },
    textInput: {
        backgroundColor: Colors.sLight, 
        padding: 20, 
        borderRadius: 10,
        marginVertical: 5,
    },
    textInputJobDescription: {
        height: 100,
        backgroundColor: Colors.sLight, 
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden',
        width: "100%",
        marginVertical: 5,
    },
    picker: {
        backgroundColor: Colors.sLight,
        padding: 5,
        borderRadius: 10,
        marginVertical: 5,
    },
    jobList: {
        paddingTop: 30,
        width: "90%",
        flex: 1,
    },
    jobItem: {
        borderRadius: 20,
        // borderWidth: 1,
        borderColor: 'white',
        marginVertical: 8,  
        backgroundColor: Colors.sLight,
        padding: 20,
        overflow: "hidden",
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 1,
    },
    profilePicture: {
        width: 200, 
        height: 200, 
        borderRadius: 20,
    },
    loadingText: {
        color: Colors.sDark,
        fontSize: Font.normSize,
        marginBottom: 15
    },
    navHeader: {
        // flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: Colors.sDark,
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 50,
    },
    navItem: {
        justifyContent: 'center',
        paddingVertical: 25,
        width: '100%',
    },
});