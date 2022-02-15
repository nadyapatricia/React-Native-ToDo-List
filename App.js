import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Task from './components/Task';

export default function App() {
  const [newTask, setNewTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    setTaskItems([...taskItems, newTask]);
    setNewTask(null);
  };

  const completeTask = (index) => {
    let copiedTaskItems = [...taskItems];
    copiedTaskItems.splice(index, 1);
    setTaskItems(copiedTaskItems);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks 📝</Text>

        <ScrollView style={styles.scrollContainer}>
          {taskItems.map((item, idx) => {
            return (
              <TouchableOpacity key={idx} onPress={() => completeTask(idx)}>
                <Task item={item} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder='Create a task'
            value={newTask}
            onChangeText={(text) => setNewTask(text)}
          />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
  tasksWrapper: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  scrollContainer: {
    marginBottom: 150,
  },
});
