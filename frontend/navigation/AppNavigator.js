// Dependencies
import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
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

const AppStack = createStackNavigator({ Main: JobBoardScreen, Job: JobScreen }, 
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

const CreateJobStack = createStackNavigator({CreateJob: CreateJobScreen},
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
const TakenJobsStack = createStackNavigator({TakenJobs: TakenJobsScreen},
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
const EmployerJobsStack = createStackNavigator({EmployerJobs: EmployerJobsScreen},
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

const MainApp = createSwitchNavigator(
  {
    App: AppStack,
    CreateJob: CreateJobStack,
    TakenJobs: TakenJobsStack,
    EmployerJobs: EmployerJobsStack,
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
