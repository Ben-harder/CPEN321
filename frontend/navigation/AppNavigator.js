// Dependencies
import React from "react";
import { TouchableOpacity, Dimensions, Platform, Keyboard } from "react-native";
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
import EmployerJobsScreen from "../screens/EmployerJobsScreen";
import JobBoardScreen from "../screens/JobBoardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import JobDetailsScreen from "../screens/JobDetailsScreen";
import AppliedJobsScreen from "../screens/AppliedJobsScreen";
import ActiveJobsScreen from "../screens/ActiveJobsScreen";
import ApplicantListScreen from "../screens/ApplicantListScreen";
import MapScreen from "../screens/MapsScreen";

// constants
import Colors from "../constants/Colors";

const AppStack = createStackNavigator({ Main: JobBoardScreen, Job: JobScreen, Map: MapScreen }, 
  {
    navigationOptions: ({navigation}) => ({
      headerTintColor: 'white',
      headerStyle: {backgroundColor: Colors.sDark, marginRight: 0, marginLeft: 0, borderBottomWidth: 0, height: 60},
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IOSIcon name="ios-menu" size={30} style={{color: 'white', paddingLeft: 15}}/>
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
      headerStyle: {backgroundColor: Colors.sDark, marginRight: 0, marginLeft: 0, borderBottomWidth: 0, height: 60},
      headerLeft:(<TouchableOpacity onPress={() => {Keyboard.dismiss(); navigation.openDrawer();}}>
        <IOSIcon name="ios-menu" size={30} style={{color: 'white', paddingLeft: 15,}}/>
        </TouchableOpacity>
      ),
      title: 'Create Job',
    })
  }
);

const EmployerJobsStack = createStackNavigator({EmployerJobs: EmployerJobsScreen, JobDetails: JobDetailsScreen, ApplicantList: ApplicantListScreen, ApplicantProfile: ProfileScreen, Map: MapScreen},
  {
    navigationOptions: ({navigation}) => ({
      headerTintColor: 'white',
      headerStyle: {backgroundColor: Colors.sDark, marginRight: 0, marginLeft: 0, borderBottomWidth: 0, height: 60},
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IOSIcon name="ios-menu" size={30} style={{color: 'white', paddingLeft: 15,}}/>
        </TouchableOpacity>
      ),
      title: 'Posted Jobs',
    })
  }
);

const AppliedJobsStack = createStackNavigator({AppliedJobs: AppliedJobsScreen, JobDetails: JobDetailsScreen, Map: MapScreen},
  {
    navigationOptions: ({navigation}) => ({
      headerTintColor: 'white',
      headerStyle: {backgroundColor: Colors.sDark, marginRight: 0, marginLeft: 0, borderBottomWidth: 0, height: 60},
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IOSIcon name="ios-menu" size={30} style={{color: 'white', paddingLeft: 15,}}/>
        </TouchableOpacity>
      ),
      title: 'Job Applications',
    })
  }
);

const ActiveJobsStack = createStackNavigator({ActiveJobs: ActiveJobsScreen, JobDetails: JobDetailsScreen, Map: MapScreen},
  {
    navigationOptions: ({navigation}) => ({
      headerTintColor: 'white',
      headerStyle: {backgroundColor: Colors.sDark, marginRight: 0, marginLeft: 0, borderBottomWidth: 0, height: 60},
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IOSIcon name="ios-menu" size={30} style={{color: 'white', paddingLeft: 15,}}/>
        </TouchableOpacity>
      ),
      title: 'Active Jobs',
    })
  }
);

const ProfileStack = createStackNavigator({ProfileDetails: ProfileScreen, EditProfile: EditProfileScreen, ChangePassword: ChangePasswordScreen},
  {
    navigationOptions: ({navigation}) => ({
      headerTintColor: 'white',
      headerStyle: {backgroundColor: Colors.sDark, marginRight: 0, marginLeft: 0, borderBottomWidth: 0, height: 60},
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
    EmployerJobs: EmployerJobsStack,
    Profile: ProfileStack,
    AppliedJobs: AppliedJobsStack,
    ActiveJobs: ActiveJobsStack
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
    drawerWidth: Dimensions.get("window").width - 80,
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
