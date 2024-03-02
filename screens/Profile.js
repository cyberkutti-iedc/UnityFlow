import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Card, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// Initialize Firestore
const db = getFirestore();

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.email);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document!");
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log("No user is signed in.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    
    auth.signOut()
      .then(() => {
        // Navigate to the login page
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>My Profile</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Card style={styles.card}>
            <Card.Content>
              <Title>Name:{userData.name}</Title>
              <Paragraph>Email: {userData.email}</Paragraph>
              <Text>Phone Number:{userData.phoneNumber}</Text>
              <Text>Semester:{userData.semester}</Text>
              <Text>My Course:{userData.course}</Text>
              <View style={styles.buttonContainer}>
                <Button onPress={() => console.log("Edit profile")} style={styles.button}>Edit Profile</Button>
                
              </View>
            </Card.Content>
          </Card>
        )}
        <View style={styles.bottomContainer}>
          
          <Button onPress={handleLogout} style={styles.logoutButton}>Logout</Button>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButton: {
    
    backgroundColor: '#ff4d4d',
    width: '80%',
    marginBottom: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  link: {
    color: 'white',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default Profile;
