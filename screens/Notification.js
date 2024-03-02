import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc ,addDoc,collection,setDoc,query} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA74blNWknlZxgHhyl_20C8Rr69ZXT6D5Y",
  authDomain: "unityflow-dadda.firebaseapp.com",
  projectId: "unityflow-dadda",
  storageBucket: "unityflow-dadda.appspot.com",
  messagingSenderId: "127300077353",
  appId: "1:127300077353:web:b36dccf9f9df124dcad938"
};
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

const Notification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const userAuth = auth().currentUser;
        if (userAuth) {
          const userDocRef = doc(firestore, 'users', userAuth.email);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUser(userData);
            fetchNotifications(userData.email);
          } else {
            console.log('User document not found in Firestore');
          }
        } else {
          setUser(null);
          setShowNotification(false);
          setNotificationMessage('');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch user-specific notifications
    const fetchNotifications = async (userEmail) => {
      try {
        const notificationsRef = collection(firestore, 'notifications');
        const q = query(notificationsRef, where('recipientEmail', '==', userEmail));
        const querySnapshot = await getDoc(q);
        if (!querySnapshot.empty) {
          const latestNotification = querySnapshot.docs[0].data();
          setShowNotification(true);
          setNotificationMessage(latestNotification.message);
        } else {
          setShowNotification(false);
          setNotificationMessage('');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    // Subscribe to auth state changes
    const unsubscribeAuth = auth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        fetchUserData();
      }
    });

    // Clean up subscriptions
    return () => {
      unsubscribeAuth();
    };
  }, []);

  const clearNotification = () => {
    setShowNotification(false);
    setNotificationMessage('');
  };

  return (
    <View style={styles.container}>
      {showNotification && (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationText}>{notificationMessage}</Text>
          <TouchableOpacity onPress={clearNotification} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  notificationContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    flex: 1,
  },
  clearButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Notification;
