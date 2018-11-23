// Dependencies
import React from "react";
import { TouchableOpacity, Dimensions, Platform } from "react-native";
import { createSwitchNavigator , createStackNavigator, createDrawerNavigator } from "react-navigation";
import IOSIcon from "react-native-vector-icons/Ionicons";

// Components
import MainTabNavigator from "./MainTabNavigator";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import CreateJobScreen from "../screens/CreateJobScreen";
import SideMenu from "./SideMenu";
import JobScreen from "../screens/JobScreen";
import TakenJobsScreen from "../screens/TakenJobsScreen";
import EmployerJobsScreen from "../screens/EmployerJobsScreen";
import JobBoardScreen from "../screens/JobBoardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import JobDetailsScreen from "../screens/JobDetailsScreen";

// constants
import Colors from "../constants/Colors";

const AppStack = createStackNavigator({ Main: JobBoardScreen, Job: JobScreen }, 
  {
    navigationOptions: ({navigation}) => ({
      headerTintColor: 'white',
      headerStyle: {backgroundColor: Colors.sDark, marginRight: 0, marginLeft: 0, borderBottomWidth: 0, height: 60},
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IOSIcon name="ios-menu" size={30} style={{color: 'white', paddingLeft: 15,}}/>
        </TouchableOpacity>
      ),
      title: 'Job Board',
    })
  }
);

const CreateJobStack = createStackNavigator({CreateJob: CreateJobScreen},
  {
    navigationOptions: ({navigation}) => ({
      headerTintColor: 'white',
      headerStyle: {backgroundColor: Colors.sDark, marginRight: 0, marginLeft: 0, borderBottomWidth: 0,},
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IOSIcon name="ios-menu" size={30} style={{color: 'white', paddingLeft: 15,}}/>
        </TouchableOpacity>
      ),
      title: 'Create Job',
    })
  }
);

const TakenJobsStack = createStackNavigator({TakenJobs: TakenJobsScreen},
  {
    navigationOptions: ({navigation}) => ({
      headerTintColor: 'white',
      headerStyle: {backgroundColor: Colors.sDark, marginRight: 0, marginLeft: 0, borderBottomWidth: 0,},
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IOSIcon name="ios-menu" size={30} style={{color: 'white', paddingLeft: 15,}}/>
        </TouchableOpacity>
      ),
      title: 'Taken Jobs',
    })
  }
);
const EmployerJobsStack = createStackNavigator({EmployerJobs: EmployerJobsScreen, JobDetails: JobDetailsScreen},
  {
    navigationOptions: ({navigation}) => ({
      headerTintColor: 'white',
      headerStyle: {backgroundColor: Colors.sDark, marginRight: 0, marginLeft: 0, borderBottomWidth: 0,},
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IOSIcon name="ios-menu" size={30} style={{color: 'white', paddingLeft: 15,}}/>
        </TouchableOpacity>
      ),
      title: 'Posted Jobs',
    })
  }
);

const ProfileStack = createStackNavigator({ProfileDetails: ProfileScreen, EditProfile: EditProfileScreen, ChangePassword: ChangePasswordScreen},
  {
    navigationOptions: ({navigation}) => ({
      headerTintColor: 'white',
      headerStyle: {backgroundColor: Colors.sDark, marginRight: 0, marginLeft: 0, borderBottomWidth: 0,},
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IOSIcon name="ios-menu" size={30} style={{color: 'white', paddingLeft: 15,}}/>
        </TouchableOpacity>
      ),
    })
  }
);

const MainApp = createSwitchNavigator(
  {
    App: AppStack,
    CreateJob: CreateJobStack,
    TakenJobs: TakenJobsStack,
    EmployerJobs: EmployerJobsStack,
    Profile: ProfileStack
  },
  {
    initialRouteName: "App",
  }, 
);

const Drawer = createDrawerNavigator(
  {
    screen: MainApp,
  }, 
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get("window").width - 120,
  }
);

const AppContainer = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    SignUp: SignUpScreen,
    SignIn: SignInScreen,
    Drawer: Drawer,
  },
  {
    initialRouteName: "AuthLoading",
  }
);

export default AppContainer;
