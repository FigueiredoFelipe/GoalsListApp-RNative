import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([
    {text:'Take a trip to Asia', key:' 01'},
  ])

  function addGoalHandler(enteredGoal){
    setCourseGoals((currentGoals)=>[...currentGoals, {text: enteredGoal, key: Math.random().toString()}])
  }

  return (
    <View style={styles.appContainer}>
        <GoalInput onAddGoal={addGoalHandler}/>
        <View style={styles.goalsContainer}>
          <FlatList data={courseGoals} renderItem={
            (itemData) => {
            itemData.index
            return (
          <GoalItem text={itemData.item.text}/>
            )
          }} alwaysBounceVertical={false} />
        </View>
    </View>
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
    goalsTitle: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 20
  }
});
