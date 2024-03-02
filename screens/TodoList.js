import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';

const TodoList = ({ tasks, onPressTask }) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('');
  const [newTaskCompleted, setNewTaskCompleted] = useState(false);

  const addTask = () => {
    if (newTaskName.trim() !== '') {
      const newTaskItem = {
        id: tasks.length + 1,
        name: newTaskName,
        subject: newTaskSubject,
        completed: newTaskCompleted,
      };
      setNewTaskName('');
      setNewTaskSubject('');
      setNewTaskCompleted(false);
      tasks.push(newTaskItem);
      // Update tasks list
      // This example just adds the new task to the existing list
      // In a real application, you might want to use a state management solution or a backend server
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressTask(item)} style={styles.taskItem}>
      <Text style={styles.taskName}>{item.name}</Text>
      <Text style={styles.taskDetails}>Subject: {item.subject}</Text>
      <Text style={styles.taskDetails}>Completed: {item.completed ? 'Yes' : 'No'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task Name"
          value={newTaskName}
          onChangeText={setNewTaskName}
        />
        <TextInput
          style={styles.input}
          placeholder="Subject"
          value={newTaskSubject}
          onChangeText={setNewTaskSubject}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskItem: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    marginBottom: 10,
    borderRadius: 5,
  },
  taskName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskDetails: {
    color: '#666',
  },
  inputContainer: {
    marginTop: 20,
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
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TodoList;
