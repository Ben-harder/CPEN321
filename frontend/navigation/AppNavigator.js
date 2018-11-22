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

const AppStack = createStackNavigator({ Main: JobBoardScreen, Job: JobScreen }, 
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {marginRight: Platform.OS === 'ios' ? 10: 0, marginLeft: Platform.OS === 'ios' ? 15: 0, borderBottomWidth: 0,}
    }),
    navigationOptions: ({navigation}) => ({
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IOSIcon name="ios-menu" size={30} />
        </TouchableOpacity>
      ),
      title: 'Job Board',
    })
  }
);

const CreateJobStack = createStackNavigator({CreateJob: CreateJobScreen},
  {
    navigationOptions: ({navigation}) => ({
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <IOSIcon name="ios-menu" size={30} />
                  </TouchableOpacity>
      ),
      title: 'Create Job',
    })
  }
);
const TakenJobsStack = createStackNavigator({TakenJobs: TakenJobsScreen},
  {
    navigationOptions: ({navigation}) => ({
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <IOSIcon name="ios-menu" size={30} />
                  </TouchableOpacity>
      ),
      title: 'Taken Jobs',
    })
  }
);
const EmployerJobsStack = createStackNavigator({EmployerJobs: EmployerJobsScreen},
  {
    navigationOptions: ({navigation}) => ({
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <IOSIcon name="ios-menu" size={30} />
                  </TouchableOpacity>
      ),
      title: 'Posted Jobs',
    })
  }
);

const ProfileStack = createStackNavigator({ProfileDetails: ProfileScreen, EditProfile: EditProfileScreen, ChangePassword: ChangePasswordScreen},
  {
    navigationOptions: ({navigation}) => ({
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <IOSIcon name="ios-menu" size={30} />
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
