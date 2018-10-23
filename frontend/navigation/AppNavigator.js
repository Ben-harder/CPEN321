// Dependencies
import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { createSwitchNavigator , createStackNavigator, createDrawerNavigator } from 'react-navigation';
import IOSIcon from "react-native-vector-icons/Ionicons";

// Components
import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import CreateJobScreen from '../screens/CreateJobScreen';
import SideMenu from './SideMenu';
import JobScreen from '../screens/JobScreen';

const AppStack = createStackNavigator({ Main: MainTabNavigator }, 
  {
    navigationOptions: ({navigation}) => ({
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <IOSIcon name="ios-menu" size={30} />
                  </TouchableOpacity>
      ),
      headerStyle: { marginRight: 10, marginLeft: 15, borderBottomWidth: 0 }
    })
  }
);
const SignInStack = createStackNavigator({ SignIn: SignInScreen });
const SignUpStack = createStackNavigator({ SignUp: SignUpScreen });
const CreateJobStack = createStackNavigator({CreateJob: CreateJobScreen});
const JobStack = createStackNavigator({Job: JobScreen});

const MainApp = createSwitchNavigator(
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    SignIn: SignInStack,
    SignUp: SignUpStack,
    CreateJob: CreateJobStack,
    Job: JobScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const AppContainer = createDrawerNavigator(
  {
    screen: MainApp,
  }, 
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
  }
);

export default AppContainer;
