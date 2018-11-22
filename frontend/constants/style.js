'use strict';

var React = require('react-native');
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import { Directions } from 'react-native-gesture-handler';


var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#ffff',
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
regText: {
    textAlign: 'center',
    fontSize: Font.normSize,
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
    width: "100%",
    padding: 10,
},
phoneInput: {

},
jobDescription: {
    // padding: 10,
    backgroundColor: 'white',
    // borderWidth: 1,
    // borderRadius: 7,
    // borderColor: Colors.sNorm,
},
textInputJobDescription: {
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: Colors.sNorm,
    overflow: 'hidden',
    width: "100%",
},
formLabel: {
    //paddingBottom: 10,
    fontSize: Font.normSize,
    color: '#000000',
    //marginTop: 10,
    textAlign: 'left',
},
jobList: {
    width: "90%",
    flex: 1,
},
jobItem: {
    borderRadius: 20,
    // borderWidth: 1,
    borderColor: 'white',
    marginVertical: 8,  
    backgroundColor: '#ffffff',
    padding: 20,
    overflow: "hidden",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 1,
},

});