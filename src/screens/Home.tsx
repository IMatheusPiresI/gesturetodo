import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, TextInput} from 'react-native';
import {Task} from '../@types';
import {ListItem} from '../components/ListItem';
import * as S from './styles';

export const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      {
        id: Math.floor(Math.random() * 9999),
        title: newTask,
      },
    ]);
    setNewTask('');
  };

  const handleDismissTask = useCallback((task: Task) => {
    setTasks(tasks => tasks.filter(currentTask => currentTask.id !== task.id));
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <S.Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <S.Title>Tasks</S.Title>
      <S.ContainerCreateTask>
        <S.InputTask
          placeholder="Search"
          onChangeText={setNewTask}
          value={newTask}
          style={styles.shadow}
        />

        <S.ButtonAddTask onPress={handleAddTask} style={styles.shadow}>
          <S.ButtonTitle>ADD</S.ButtonTitle>
        </S.ButtonAddTask>
      </S.ContainerCreateTask>

      <FlatList
        data={tasks}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <ListItem task={item} onDismiss={handleDismissTask} />
        )}
        style={{flex: 1, width: '100%'}}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      />
    </S.Container>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
