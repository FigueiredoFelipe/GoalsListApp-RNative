import { Pressable, StyleSheet, Text, View } from "react-native"

function GoalItem({text, onDeleteItem, id}) {
    return (
        <View style={styles.goalITems}>
            <Pressable
                android_ripple={{color:'#d1d1ddd1'}}
                onPress={onDeleteItem.bind(this, id)}
                style={({pressed})=> pressed && styles.pressedItem}
                >
                <Text style={styles.goalText}>{text}</Text>
            </Pressable>
        </View>
    )
}

export default GoalItem

const styles = StyleSheet.create({
    goalITems: {
        backgroundColor: '#f7f7f7',
        borderColor: 'hsla(0, 0%, 85%, .75)',
        margin: 2,
        borderWidth: 2,
        borderRadius: 8,
    },
    pressedItem: {
        opacity: 0.5
    },
    goalText: {
        padding: 15,
        fontSize: 20,
        fontWeight: '700',
},
})