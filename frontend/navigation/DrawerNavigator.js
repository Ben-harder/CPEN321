import React, { Component } from 'react';
import { AppRegistry, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import SideMenu from './SideMenu'
import stackNav from './AppNavigator';

const drawernav = DrawerNavigator({
  Main: {
      screen: stackNav,
    }
  }, 
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
});

AppRegistry.registerComponent('Root', () => drawernav);
