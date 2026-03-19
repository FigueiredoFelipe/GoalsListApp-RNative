import { useCallback } from "react"
import { Platform, Pressable, StyleSheet, Text, View } from "react-native"

function GoalItem({text, onDeleteItem, id}) {
    const handlePress = useCallback(()=>{
        onDeleteItem(id)
    }, [onDeleteItem, id])

    const isAndroid = Platform.OS === 'android';

    return (
        <View style={styles.goalItem}>
            <Pressable
                android_ripple={isAndroid ? { color: '#334155' } : null}
                onPress={handlePress}
                style={({ pressed }) => [
                    styles.pressable,
                    pressed && !isAndroid ? styles.pressedItem : null
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Delete goal: ${text}`}
                accessibilityHint="Double tap to delete this goal"
            >
                <Text style={styles.goalText}>{text}</Text>
                <Text style={styles.deleteHint}>tap to remove</Text>
            </Pressable>
        </View>
    )
}

export default GoalItem

const styles = StyleSheet.create({
    goalItem: {
        backgroundColor: '#1E293B',
        borderColor: '#334155',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 8,
        overflow: 'hidden',
    },
    pressable: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pressedItem: {
        opacity: 0.6,
    },
    goalText: {
        color: '#F1F5F9',
        fontSize: 15,
        fontWeight: '600',
        flex: 1,
    },
    deleteHint: {
        color: '#475569',
        fontSize: 10,
        fontStyle: 'italic',
    },
})