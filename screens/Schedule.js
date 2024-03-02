import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet ,TouchableOpacity,ScrollView} from 'react-native';
import { Provider as PaperProvider, Appbar, Card, Title, Paragraph, TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import { getAuth } from 'firebase/auth'; 
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, updateDoc,getDoc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';

const firebaseConfig = {
  apiKey: "AIzaSyA74blNWknlZxgHhyl_20C8Rr69ZXT6D5Y",
  authDomain: "unityflow-dadda.firebaseapp.com",
  projectId: "unityflow-dadda",
  storageBucket: "unityflow-dadda.appspot.com",
  messagingSenderId: "127300077353",
  appId: "1:127300077353:web:b36dccf9f9df124dcad938"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Schedule = () => {
  const [percentageDone, setPercentageDone] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [finishTime, setFinishTime] = useState(new Date());
  const [breakTime, setBreakTime] = useState(new Date());
  const [totalWork, setTotalWork] = useState(0);
  const [workDone, setWorkDone] = useState(0);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showFinishTimePicker, setShowFinishTimePicker] = useState(false);
  const [showBreakTimePicker, setShowBreakTimePicker] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.email);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const { workDone, totalWork } = userData;
            const percentage = (workDone / totalWork) * 100;
            setPercentageDone(percentage);
            setSubjects(userData.subjects || []);
          }
        } else {
          console.log('No user signed in.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
     // Set up interval to fetch user data every 5 seconds
     const intervalId = setInterval(fetchData, 1000);

     // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const addSubject = async () => {
    if (newSubject && startDate && startTime && finishTime && breakTime) {
      const totalHours = Math.round((finishTime - startTime - breakTime) / (1000 * 60 * 60));
      if (totalHours <= 50) {
        const newSubjects = [
          ...subjects,
          {
            name: newSubject,
            startDate,
            startTime,
            finishTime,
            breakTime,
            totalHours,
            workDone: 0
          }
        ];

        try {
          const user = auth.currentUser;
          const userDocRef = doc(db, 'users', user.email);
          await setDoc(userDocRef, { email: user.email, subjects: newSubjects }, { merge: true });
          setSubjects(newSubjects);
          setNewSubject('');
          setStartDate(new Date());
          setStartTime(new Date());
          setFinishTime(new Date());
          setBreakTime(new Date());
          console.log("Subject added successfully");
        } catch (error) {
          console.error('Error adding subject:', error);
        }
      } else {
        console.log("Total work exceeds the limit of 50 hours");
      }
    }
  };

  const removeSubject = async (index) => {
    try {
      const updatedSubjects = [...subjects];
      updatedSubjects.splice(index, 1);
      const user = auth.currentUser;
      const userDocRef = doc(db, 'users', user.email);
      await updateDoc(userDocRef, { subjects: updatedSubjects });
      setSubjects(updatedSubjects);
      console.log("Subject removed successfully");
    } catch (error) {
      console.error('Error removing subject:', error);
    }
  };

  const updateWork = async () => {
    try {
      const user = auth.currentUser;
      const userDocRef = doc(db, 'users', user.email);
      await setDoc(userDocRef, { email: user.email, totalWork, workDone }, { merge: true });
      console.log("Work updated successfully");
    } catch (error) {
      console.error('Error updating work:', error);
    }
  };

  const toggleStartDatePicker = () => {
    setShowStartDatePicker(!showStartDatePicker);
  };

  const toggleStartTimePicker = () => {
    setShowStartTimePicker(!showStartTimePicker);
  };

  const toggleFinishTimePicker = () => {
    setShowFinishTimePicker(!showFinishTimePicker);
  };

  const toggleBreakTimePicker = () => {
    setShowBreakTimePicker(!showBreakTimePicker);
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const handleFinishTimeChange = (event, selectedTime) => {
    setShowFinishTimePicker(false);
    if (selectedTime) {
      setFinishTime(selectedTime);
    }
  };

  const handleBreakTimeChange = (event, selectedTime) => {
    setShowBreakTimePicker(false);
    if (selectedTime) {
      setBreakTime(selectedTime);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Schedule" />
      </Appbar.Header>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <PaperTextInput
              label="Subject"
              value={newSubject}
              onChangeText={setNewSubject}
            />
            <TouchableOpacity onPress={toggleStartDatePicker}>
              <PaperTextInput
                label="Start Date"
                value={startDate.toLocaleDateString()}
                editable={false}
              />
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={handleStartDateChange}
              />
            )}
            <TouchableOpacity onPress={toggleStartTimePicker}>
              <PaperTextInput
                label="Start Time"
                value={startTime.toLocaleTimeString()}
                editable={false}
              />
            </TouchableOpacity>
            {showStartTimePicker && (
              <DateTimePicker
                value={startTime}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={handleStartTimeChange}
              />
            )}
            <TouchableOpacity onPress={toggleFinishTimePicker}>
              <PaperTextInput
                label="Finish Time"
                value={finishTime.toLocaleTimeString()}
                editable={false}
              />
            </TouchableOpacity>
            {showFinishTimePicker && (
              <DateTimePicker
                value={finishTime}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={handleFinishTimeChange}
              />
            )}
            <TouchableOpacity onPress={toggleBreakTimePicker}>
              <PaperTextInput
                label="Break Time"
                value={breakTime.toLocaleTimeString()}
                editable={false}
              />
            </TouchableOpacity>
            {showBreakTimePicker && (
              <DateTimePicker
                value={breakTime}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={handleBreakTimeChange}
              />
            )}
            <Text>Total Work Vs Work Done</Text>
            <PaperTextInput
              label="Total Work (hours)"
              keyboardType="numeric"
              value={totalWork.toString()}
              onChangeText={text => setTotalWork(parseInt(text) || 0)}
            />
            <PaperTextInput
              label="Work Done (hours)"
              keyboardType="numeric"
              value={workDone.toString()}
              onChangeText={text => setWorkDone(parseInt(text) || 0)}
            />
           <PaperButton mode="contained" onPress={addSubject} style={styles.button}>Add Subject</PaperButton>
<PaperButton mode="contained" onPress={updateWork} style={styles.button}>Update My Work</PaperButton>

          </Card.Content>
        </Card>
        <View style={styles.subjectsList}>
          <Title>Subjects:</Title>
          {subjects.map((subject, index) => (
            <Card key={index} style={styles.subjectItem}>
              <Card.Content>
                <Title>{subject.name}</Title>
                <Paragraph>Total Work: {subject.totalHours} hours</Paragraph>
                <Paragraph>Work Done: {subject.workDone} hours</Paragraph>
              
              </Card.Content>
            </Card>
          ))}
        </View>
        <View style={styles.percentageContainer}>
          <Card style={styles.percentageCard}>
            <Card.Content>
              <Text style={styles.percentageText}>Work Done Percentage</Text>
              <Text style={styles.percentageValue}>               {percentageDone}%</Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </PaperProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
  },
  subjectsList: {
    alignItems: 'center',
  },
  subjectItem: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10, // Add margin top to create a gap between buttons
  },
  percentageContainer: {
    marginTop: 20,
    marginLeft:20,
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
    marginLeft: 1,
  },
  percentageValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green', // Change color as needed
  },
});


export default Schedule;