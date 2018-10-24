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
import TakenJobsScreen from '../screens/TakenJobsScreen';
import EmployerJobsScreen from '../screens/EmployerJobsScreen';

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
const TakenJobsStack = createStackNavigator({TakenJobs: TakenJobsScreen});
const EmployerJobsStack = createStackNavigator({EmployerJobs: EmployerJobsScreen});

const MainApp = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    SignIn: SignInStack,
    SignUp: SignUpStack,
    CreateJob: CreateJobStack,
    Job: JobScreen,
    TakenJobs: TakenJobsStack,
    EmployerJobs: EmployerJobsStack,
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
