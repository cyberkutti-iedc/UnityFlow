import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Animated, Easing } from 'react-native';
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, } from 'firebase/auth'; // Import Firebase Auth functions
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc,setDoc ,doc} from 'firebase/firestore'; // Import Firestore functions
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');

  // Firebase configuration

  const firebaseConfig = {
    apiKey: "AIzaSyA74blNWknlZxgHhyl_20C8Rr69ZXT6D5Y",
    authDomain: "unityflow-dadda.firebaseapp.com",
    projectId: "unityflow-dadda",
    storageBucket: "unityflow-dadda.appspot.com",
    messagingSenderId: "127300077353",
    appId: "1:127300077353:web:b36dccf9f9df124dcad938"
  };
  // Initialize Firebase app
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(); // Get Firebase Auth instance
  const db = getFirestore(); // Get Firestore instance

  // Animation values
  const inputOpacity = useState(new Animated.Value(0))[0];
  const buttonScale = useState(new Animated.Value(0))[0];

  const handleRegister = async () => {
    try {
      // Register the user
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
  
      // If registration is successful, create a document in Firestore
      await setDoc(doc(db, 'users', user.email), {
        name: name,
        phoneNumber: phoneNumber,
        course: course,
        semester: semester,
        password:password,
        email:email,
      });
  
      console.log('User registered successfully:', user);
      navigation.navigate('Login');
      // Handle navigation or any other action after successful registration
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  // Animation configurations
  const animateInputs = () => {
    Animated.parallel([
      Animated.timing(inputOpacity, {
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
    <ImageBackground source={require('../assets/images/login2.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Animated.View style={[styles.inputContainer, { opacity: inputOpacity }]}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#000"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#000"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#000"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#000"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Course"
            placeholderTextColor="#000"
            value={course}
            onChangeText={setCourse}
          />
          <TextInput
            style={styles.input}
            placeholder="Semester"
            placeholderTextColor="#000"
            value={semester}
            onChangeText={setSemester}
          />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
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
  registerButton: {
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

export default Register;
