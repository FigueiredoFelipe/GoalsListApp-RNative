import { Pressable, StyleSheet, Text, View } from "react-native"

function GoalItem({text}) {
    return (
    <Pressable>
        <View style={styles.goalITems}>
            <Text style={styles.goalText}>{text}</Text>
        </View>
    </Pressable>
    )
}

export default GoalItem

const styles = StyleSheet.create({
    goalITems: {
        padding: 15,
        backgroundColor: '#f7f7f7',
        borderColor: 'hsla(0, 0%, 85%, .75)',
        margin: 2,
        borderWidth: 2,
        borderRadius: 8,
},
    goalText: {
        fontSize: 20,
        fontWeight: '700',
},
})