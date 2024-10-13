import { useCallback } from "react"
import { Platform, Pressable, StyleSheet, Text, View } from "react-native"

function GoalItem({text, onDeleteItem, id}) {
    // Memorized press handler to avoid unnecessary re-renders
    const handlePress = useCallback(()=>{
        onDeleteItem(id)
    }, [onDeleteItem, id])

    // Detect if the platform is Android to apply specific styles
    const isAndroid = Platform.OS === 'android';

    return (
        <View style={styles.goalItems}>
            <Pressable
                android_ripple={isAndroid ? { color: '#d1d1ddd1' } : null}
                onPress={handlePress}
                style={({ pressed }) => [pressed && !isAndroid ? styles.pressedItem : null]} // Apply pressed state style for non-Android
                accessibilityRole="button" // Accessibility role
                accessibilityLabel={`Delete goal: ${text}`} // Accessibility label for screen readers
                accessibilityHint="Double tap to delete this goal" // Accessibility hint
            >
                <Text style={styles.goalText}>{text}</Text>
            </Pressable>
        </View>
    )
}

export default GoalItem

const styles = StyleSheet.create({
    goalItems: {
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