import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Login from './Login';
const Onboarding = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <Swiper style={styles.wrapper} loop={false}>
      <View style={styles.slide}>
        <Image source={require('../assets/images/4.png')} style={styles.image} />
        <Text style={styles.title}>Welcome to Study Timer!</Text>
        <Text style={styles.description}>Manage your study sessions effectively with our app.</Text>
      </View>
      <View style={styles.slide}>
        <Image source={require('../assets/images/5.png')} style={styles.image} />
        <Text style={styles.title}>Customizable Timer</Text>
        <Text style={styles.description}>Set focused study periods and breaks tailored to your needs.</Text>
      </View>
      <View style={styles.slide}>
        <Image source={require('../assets/images/book3.png')} style={styles.image} />
        <Text style={styles.title}>Insights & Trends</Text>
        <Text style={styles.description}>Track study durations and productivity trends to refine your habits.</Text>
      </View>
      <View style={styles.slide}>
        <Image source={require('../assets/images/book4.png')} style={styles.image} />
        <Text style={styles.title}>Stay Motivated</Text>
        <Text style={styles.description}>Enjoy motivational quotes and visual cues to keep you focused.</Text>
        <TouchableOpacity style={styles.getStartedButton} onPress={handleLogin}>
          <Text style={styles.getStartedButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.getStartedButton} onPress={handleRegister}>
          <Text style={styles.getStartedButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 40,
    marginTop: 10,
  },
  getStartedButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Onboarding;
