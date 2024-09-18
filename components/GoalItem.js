import { Platform, Pressable, StyleSheet, Text, View } from "react-native"

function GoalItem({text, onDeleteItem, id}) {
    return (
        <View style={styles.goalITems}>
            <Pressable
                android_ripple={Platform.OS === 'android' ? {color:'#d1d1ddd1'} : null}
                onPress={onDeleteItem.bind(this, id)}
                style={({pressed}) => pressed && Platform.OS !== 'android' ? styles.pressedItem : null}
                >
                <Text style={styles.goalText}>{text}</Text>
            </Pressable>
        </View>
    )
}

export default GoalItem

const styles = StyleSheet.create({
    goalITems: {
        backgroundColor: '#e4d0ff',
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