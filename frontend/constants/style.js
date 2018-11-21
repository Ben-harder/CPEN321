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
    backgroundColor: "#fff",
},
textLink: {
    paddingVertical: 10,
},
textLinkText: {
    fontSize: Font.butSize,
    color: Colors.buttonText,
    fontWeight: Font.thick,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.sNorm,
    backgroundColor: Colors.sNorm,
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
    padding: 30,
},
regText: {
    textAlign: 'center',
    fontSize: Font.normSize,
},
textInput: {
    width: "90%",
    height: 40, 
    padding: 10,
},

});