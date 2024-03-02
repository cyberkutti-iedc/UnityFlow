import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icons from the MaterialCommunityIcons set
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Insight from '../screens/Insight';
import Schedule from '../screens/Schedule';

const Dashboard = () => {
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: 'home', title: 'Home', icon: 'home', name: 'Home', component: Home },
    
    { key: 'insight', title: 'Insight', icon: 'chart-bar', name: 'Insight', component: Insight },
    { key: 'schedule', title: 'Schedule', icon: 'calendar', name: 'Schedule', component: Schedule },
    { key: 'profile', title: 'Profile', icon: 'account', name: 'Profile', component: Profile },
  ];

  const renderIcon = ({ route, focused, color }) => {
    let iconName;

    switch (route.icon) {
      case 'home':
        iconName = 'home';
        break;
      case 'account':
        iconName = 'account';
        break;
      case 'chart-bar':
        iconName = 'chart-bar';
        break;
      case 'calendar':
        iconName = 'calendar';
        break;
      default:
        iconName = 'error'; 
    }

    return <Icon name={iconName} size={24} color={color} />;
  };

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    profile: Profile,
    insight: Insight,
    schedule: Schedule,
  });

  return (
    <View style={styles.container}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderIcon={renderIcon}
        renderScene={renderScene}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Dashboard;
