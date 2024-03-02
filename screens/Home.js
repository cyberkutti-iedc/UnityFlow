import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Animated, Image ,TextInput, FlatList ,TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text,Title, Card, TouchableRipple, ProgressBar, Paragraph} from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc ,addDoc,collection,setDoc,query} from 'firebase/firestore';
import Notification from './Notification';
import Timer from './Timer';
import TodoList from './TodoList';
import Notes from './Notes';

const firebaseConfig = {
  apiKey: "AIzaSyA74blNWknlZxgHhyl_20C8Rr69ZXT6D5Y",
  authDomain: "unityflow-dadda.firebaseapp.com",
  projectId: "unityflow-dadda",
  storageBucket: "unityflow-dadda.appspot.com",
  messagingSenderId: "127300077353",
  appId: "1:127300077353:web:b36dccf9f9df124dcad938"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Home = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [animation] = useState(new Animated.Value(0));
  const [insightData, setInsightData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('')
  const [percentageDone, setPercentageDone] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('');

  const handleTaskPress = (task) => {
    // Handle task press, e.g., navigate to task details screen
    console.log('Clicked task:', task);
  }
  useEffect(() => {
    const fetchUserData = async () => {
      const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const userDocRef = doc(db, 'users', userAuth.email);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUser(userData);
          
            const { workDone, totalWork } = userData;
            const percentage = (workDone / totalWork) * 100;
            setPercentageDone(percentage);
             // Fetch tasks data from Firestore
          const tasksCollectionRef = doc(db, 'users', userAuth.email, 'tasks');
            
          const q = query(tasksCollectionRef);
          const querySnapshot = await getDoc(q);
          const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setTasks(tasksData);
          } else {
            console.log('User document not found in Firestore');
          }
        } else {
          setUser(null);
        }
      });
      return unsubscribe;
    };
  
    // Fetch user data initially
    fetchUserData();
  
   
    const intervalId = setInterval(fetchUserData, 1000);
  
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const handlePress = () => {
   
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleProfile = () => {
 
    navigation.navigate('Profile');
  };
  
  const handleCommunity = () => {

    navigation.navigate('PaperReactCommunity');
  };

  const handleNotification = () => {
    setShowNotification(!showNotification);
    navigation.navigate('Notification');
  };
 
  const handleStart = () => {
    // Code to handle timer start
    console.log('Timer started');
  };

  const handleStop = (seconds) => {
    // Code to handle timer stop
    console.log(`Timer stopped at ${seconds} seconds`);
  };

  // Function to add a new task/note
  const handleAddTask = async () => {
    if (newTaskName.trim() !== '' && newTaskSubject.trim() !== '') {
      const newTask = {
        name: newTaskName,
        subject: newTaskSubject,
        completed: false,
      };
  
      try {
        // Add the new task document to the user's specific collection
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.email); // Reference to the user's document
          await setDoc(userDocRef, { tasks: newTask }, { merge: true }); // Merge with existing data if any
          console.log('Task added successfully');
          setNewTaskName('');
          setNewTaskSubject('');
        } else {
          console.log('No user signed in.');
        }
      } catch (error) {
        console.error('Error adding task: ', error);
      }
    }
  };
  const handleDeleteTask = async (taskId) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.email);
        await setDoc(userDocRef, { tasks: tasks.filter(task => task.id !== taskId) }, { merge: true });
        setTasks(tasks.filter(task => task.id !== taskId));
      } else {
        console.log('No user signed in.');
      }
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  const addTask = async (name, subject) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.email);
        const newTask = { id: Date.now().toString(), name, subject };
        await setDoc(userDocRef, { tasks: [...tasks, newTask] }, { merge: true });
        setTasks([...tasks, newTask]);
      }
    } catch (error) {
      console.error('Error adding task: ', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.email);
        await setDoc(userDocRef, { tasks: tasks.filter(task => task.id !== taskId) }, { merge: true });
        setTasks(tasks.filter(task => task.id !== taskId));
      }
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  }; 
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.notificationIconContainer}>
          <TouchableRipple onPress={handleNotification}>
            <Image
              source={showNotification ? require('../assets/images/onNoti.png') : require('../assets/images/noNoti.png')}
              style={styles.notificationIcon}
            />
          </TouchableRipple>
        </View>
        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.bigText}>Hello, {user.name}</Text>
            <View style={styles.buttonsContainer}>
              <Button
                mode="contained"
                onPress={handleCommunity}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Community
              </Button>
              <Button
                mode="contained"
                onPress={handleProfile}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Profile
              </Button>
            </View>
          </View>
        )}

        <View style={styles.gridContainer}>
          <TouchableRipple onPress={handlePress} style={[styles.gridItem, styles.shadow]}>
            <Card.Content style={styles.cardContent}>
              <Text style={styles.cardTitle}>Study Timer</Text>
              <Timer onStart={handleStart} onStop={handleStop} />
            </Card.Content>
          </TouchableRipple>
          <TouchableRipple onPress={handlePress} style={[styles.gridItem, styles.shadow]}>
          <Card.Content style={styles.cardContent}>
              <Text style={styles.cardTitle}>My Notes</Text>
              <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task Name"
          value={newTaskName}
          onChangeText={setNewTaskName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Subject"
          value={newTaskSubject}
          onChangeText={setNewTaskSubject}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonLabel}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.taskList}>
      {tasks.map(task => (
            <Card key={task.id} style={styles.taskCard}>
              <Card.Content>
                <Text style={styles.taskName}>{task.task_name}</Text>
                <Text style={styles.taskSubject}>Subject: {task.task_subject}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => handleDeleteTask(task.id)}>Delete</Button>
              </Card.Actions>
               <Title>{tasks.task_name}</Title>
                <Paragraph>Subject: {tasks.task_subject}</Paragraph>
            </Card>
          ))}


      </View>
            </Card.Content>
          </TouchableRipple>
          
          <View style={styles.percentageContainer}>
            <Card style={styles.percentageCard}>
              <Card.Content>
                <Text style={styles.percentageText}>Percentage Done</Text>
                <Text style={styles.percentageValue}>{percentageDone}%</Text>
              </Card.Content>
            </Card>
            
          </View>
          
        </View>
        
      </View>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notificationIconContainer: {
    alignSelf: 'flex-end',
    margin: 10,
  },
  notificationIcon: {
    width: 30,
    height: 30,
  },
  userInfo: {
    marginBottom: 20,
    marginRight: 100,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 50,
  },
  button: {
    marginHorizontal: 10,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bigText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 100,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  gridItem: {
    width: '45%',
    aspectRatio: 1, // Set aspect ratio to make the box square
    margin: '2.5%',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5, // Shadow effect
  },
  cardContent: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  percentageContainer: {
    marginTop: 20,
  },
  percentageCard: {
    width: 300,
    padding: 20,
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  percentageValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green', // Change color as needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
  },
  task: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  taskName: {
    fontWeight: 'bold',
  },
  taskSubject: {
    color: '#666',
  },
  userInfo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  bigText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default Home;