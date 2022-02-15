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
import CreateTask from './assets/create-task';

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

        {taskItems.length > 0 ? (
          <ScrollView style={styles.scrollContainer}>
            {taskItems.map((item, idx) => {
              return (
                <TouchableOpacity key={idx} onPress={() => completeTask(idx)}>
                  <Task item={item} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.emptyStateContainer}>
            <CreateTask width={200} height={200} />
            <Text style={[styles.emptyTaskTitle, styles.grayTextColor]}>
              No Task Found!
            </Text>
            <Text style={styles.grayTextColor}>Try creating a new task</Text>
          </View>
        )}

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
    marginTop: 30,
    marginBottom: 150,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
  },
  emptyTaskTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  grayTextColor: {
    color: '#706e6e',
  },
});
