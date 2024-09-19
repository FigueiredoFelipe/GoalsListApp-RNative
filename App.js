import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([])

  function startAddGoalHandler(){
    setModalIsVisible(true)
  }

  function endAddGoalHandler(){
    setModalIsVisible(false)
    
  }

  function addGoalHandler(enteredGoal){
    setCourseGoals((currentGoals)=>[...currentGoals, {text: enteredGoal, id: Math.random().toString()}])
    endAddGoalHandler()
  }

  function deleteGoalHandler(id){
    setCourseGoals((currentGoals)=>{
      return currentGoals.filter((goal)=>goal.id !==id)
    })
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Add New Goal' color={'#111'} onPress={startAddGoalHandler}/>
          </View>
        </View>
          <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} onCancel={endAddGoalHandler}/>
          <View style={styles.goalsContainer}>
            <FlatList data={courseGoals} renderItem={
              (itemData) => {
                itemData.index
                return (
                  <GoalItem text={itemData.item.text} onDeleteItem={deleteGoalHandler} id={itemData.item.id}/>
                )
              }} alwaysBounceVertical={false} />
          </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
    goalsContainer: {
    flex: 5,
  },
  buttonContainer:{
    alignItems: 'center',
  },
  button: {
    width: '90%',
    marginTop: 5,
    marginBottom: 5,
  }
});
