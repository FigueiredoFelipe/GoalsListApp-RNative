import { useCallback, useState } from "react"
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

function GoalInput(props) {
    const [enteredGoal, setEnteredGoal] = useState('')

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText)
    }

    const addGoalHandler = useCallback(()=>{
        if (!enteredGoal.trim()) return
        props.onAddGoal(enteredGoal)
        setEnteredGoal('')
    }, [enteredGoal, props])

    const onCancelation = useCallback(()=>{
        setEnteredGoal('')
        props.onCancel()
    }, [props])

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/goal.png')}
                />
                <Text style={styles.heading}>What's your goal?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type your goal here..."
                    value={enteredGoal}
                    placeholderTextColor='#475569'
                    onChangeText={goalInputHandler}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={onCancelation}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addButton} onPress={addGoalHandler}>
                        <Text style={styles.addButtonText}>Add Goal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default GoalInput

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#0F172A',
    },
    image: {
        width: 90,
        height: 90,
        marginBottom: 24,
        opacity: 0.9,
    },
    heading: {
        color: '#F1F5F9',
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: -0.5,
        marginBottom: 16,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#334155',
        backgroundColor: '#1E293B',
        color: '#F1F5F9',
        borderRadius: 10,
        width: '100%',
        padding: 14,
        fontSize: 15,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 13,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#334155',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#94A3B8',
        fontSize: 14,
        fontWeight: '600',
    },
    addButton: {
        flex: 1,
        paddingVertical: 13,
        borderRadius: 10,
        backgroundColor: '#F03E2F',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
})