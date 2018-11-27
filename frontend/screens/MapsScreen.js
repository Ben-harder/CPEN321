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
import { WebBrowser, MapView } from "expo";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import IOSIcon from "react-native-vector-icons/Ionicons";

// components
import Loading from "../components/Loading";

const s = require('../constants/style');

class MapScreen extends React.Component
{
  static navigationOptions = ({ navigation }) => {
      return {
          headerLeft:(
              <TouchableOpacity onPress={() => navigation.navigate(navigation.getParam("source", "Main"))}>
                  <IOSIcon name="ios-arrow-back" size={25} style={{color: Colors.buttonText, paddingLeft: 15,}}/>
              </TouchableOpacity>
          ),
          title: navigation.getParam("address", ""),
          headerTintColor: Colors.buttonText,
      };
  };

  constructor(props)
  {
      super(props);
      this.state = {
          loading: true
      }
  }

  render()
  {
      // if (this.state.loading) return (<Loading />);
      return (
          <MapView
              style={{ flex: 1 }}
              provider="google"
              region={{
                  latitude: 49.2985705,
                  longitude: -122.8005454,
                  latitudeDelta: 0.0100,
                  longitudeDelta: 0.0060
              }}
          >
            <MapView.Marker
      
              coordinate={{
                latitude: 49.2985705,
                longitude: -122.8005454,
              }}
              title="My Marker"
              description="Some description"
            />
          </MapView>
      );
  }
}

export default MapScreen;
