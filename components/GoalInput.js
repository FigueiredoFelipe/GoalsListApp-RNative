import { useCallback, useState } from "react"
import { Button, Image, Modal, StyleSheet, Text, TextInput, View } from "react-native"

function GoalInput(props) {

    const [enteredGoal , setEnteredGoal] = useState('')

    // Handler to update the entered goal value as the user types
    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText)
    }; 

    const addGoalHandler = useCallback(()=>{
        if (!enteredGoal.trim()) {
            // Prevent adding empty goals
            return
        }
        props.onAddGoal(enteredGoal)
        setEnteredGoal('')
    }, [enteredGoal, props])

    // Handler to reset input and cancel goal addition
    const onCancelation = useCallback(()=>{
        setEnteredGoal('')
        props.onCancel()

    },[props])

    return (
    <>
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image 
                style={styles.image}
                source={require('../assets/images/goal.png')}
                />
                <TextInput
                style={styles.textInput}
                placeholder="What's your goal?"
                value={enteredGoal}
                placeholderTextColor={'#111'}
                onChangeText={goalInputHandler}
                />
            <View style={styles.buttonContainer}>
            <View style={styles.button}>
                    <Button
                    title='Cancel'
                    color={'#f31282'}
                    onPress={onCancelation}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    title='Add Goal'
                    onPress={addGoalHandler}
                    color={'#5e0acc'}
                    />
                </View>
            </View>
            </View>
        </Modal>
    </>
)}

export default GoalInput

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#311b6b'
    },
    image: {
        width: 100,
        height: 100,
        margin: 20
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        color: '#120438',
        borderRadius: 5,
        width: '100%',
        padding: 9,
    },
    buttonContainer: {
    flexDirection: 'row',
    marginTop: 8
    },
    button: {
        width: 100,
        marginHorizontal: 8,
    }
})