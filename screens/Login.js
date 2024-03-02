import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'; 
import { initializeApp } from "firebase/app";

import { createStackNavigator } from '@react-navigation/stack';



const firebaseConfig = {
    apiKey: "AIzaSyA74blNWknlZxgHhyl_20C8Rr69ZXT6D5Y",
    authDomain: "unityflow-dadda.firebaseapp.com",
    projectId: "unityflow-dadda",
    storageBucket: "unityflow-dadda.appspot.com",
    messagingSenderId: "127300077353",
    appId: "1:127300077353:web:b36dccf9f9df124dcad938"
  };


const firebaseApp = initializeApp(firebaseConfig);

const Stack = createStackNavigator();

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const emailInputOpacity = useState(new Animated.Value(0))[0];
  const passwordInputOpacity = useState(new Animated.Value(0))[0];
  const buttonScale = useState(new Animated.Value(0))[0];
  const auth = getAuth(); 
  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password); 
      console.log('Login successful:', response.user);
     
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };
  
  // Animation configurations
  const animateInputs = () => {
    Animated.parallel([
      Animated.timing(emailInputOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(passwordInputOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 500,
        easing: Easing.elastic(1.5),
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Trigger animations on component mount
  useEffect(() => {
    animateInputs();
  }, []);

  return (
    <ImageBackground source={require('../assets/images/login1.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Animated.View style={[styles.inputContainer, { opacity: emailInputOpacity }]}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#000"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Animated.View>
        <Animated.View style={[styles.inputContainer, { opacity: passwordInputOpacity }]}>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#000"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    color: '#000',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  loginButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
