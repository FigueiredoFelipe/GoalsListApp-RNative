import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"

function GoalInput(props) {

    const [enteredGoal , setEnteredGoal] = useState('')

    function goalInputHandler(enteredText){setEnteredGoal(enteredText);}

    function addGoalHandler(){
        if (enteredGoal.trim().length === 0) {
            return
        }
        props.onAddGoal(enteredGoal)
        setEnteredGoal('')
    }

    return (
    <>
        <Text style={styles.goalsTitle}>Goals List</Text>
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.textInput}
            placeholder="What's your goal?"
            value={enteredGoal}
            onChangeText={goalInputHandler}
            />

            <Button
            title='Add Goal'
            onPress={addGoalHandler}
            />
        </View>
    </>
)}

export default GoalInput

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '70%',
        marginRight: 8,
        padding: 8,
        borderRadius: 5
    },
    goalsTitle: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 20
    }
})