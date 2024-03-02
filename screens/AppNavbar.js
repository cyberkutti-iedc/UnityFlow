import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { Image } from 'react-native';

const AppNavbar = ({ navigation, state }) => {
  return (
    <BottomNavigation
      navigationState={state}
      onIndexChange={(index) => navigation.navigate(state.routes[index].name)}
     
      renderIcon={({ route, focused, color }) => {
        let iconImage;

        switch (route.name) {
          case 'Home':
            iconImage = require('../assets/images/1c.png'); // Replace with your home icon image path
            break;
          case 'Profile':
            iconImage = require('../assets/images/profile.png'); // Replace with your profile icon image path
            break;
          case 'Insight':
            iconImage = require('../assets/images/insight.png'); // Replace with your insight icon image path
            break;
          case 'Schedule':
            iconImage = require('../assets/images/2c.png'); // Replace with your schedule icon image path
            break;
          default:
            iconImage = null;
        }

        return <Image source={iconImage} style={{ width: 24, height: 24, tintColor: 'black' }} />;
      }}
    />
  );
};

export default AppNavbar;
