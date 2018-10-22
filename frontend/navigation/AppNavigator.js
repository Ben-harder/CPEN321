import React from 'react';
import { createSwitchNavigator , createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import CreateJobScreen from '../screens/CreateJobScreen';
import JobScreen from '../screens/JobScreen';


const AppStack = createStackNavigator({ Main: MainTabNavigator });
const SignInStack = createStackNavigator({ SignIn: SignInScreen });
const SignUpStack = createStackNavigator({ SignUp: SignUpScreen });
const CreateJobStack = createStackNavigator({CreateJob: CreateJobScreen});
const JobStack = createStackNavigator({Job: JobScreen});

export default createSwitchNavigator(
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
  }
);
