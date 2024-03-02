import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

const Notes = ({ tasks, addTask, deleteTask }) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('');

  const handleAddTask = () => {
    if (newTaskName.trim() !== '' && newTaskSubject.trim() !== '') {
      addTask(newTaskName, newTaskSubject);
      setNewTaskName('');
      setNewTaskSubject('');
    }
  };

  return (
    <View style={styles.container}>
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
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <Card style={styles.taskCard}>
            <Card.Content>
              <Text style={styles.taskName}>{item.name}</Text>
              <Text style={styles.taskSubject}>Subject: {item.subject}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => deleteTask(item.id)}>Delete</Button>
            </Card.Actions>
          </Card>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
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
  taskCard: {
    marginBottom: 10,
  },
  taskName: {
    fontWeight: 'bold',
  },
  taskSubject: {
    color: '#666',
  },
});

export default Notes;
