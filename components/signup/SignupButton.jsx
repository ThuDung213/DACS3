import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function SignupButton({ onPress }) {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Text style={styles.signIn}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        overflow: "hidden",
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        overflow: "hidden",
    },
    signIn: {
        fontSize: 18,
        backgroundColor: "lightblue",
        paddingVertical: 13,
        paddingHorizontal: 30,
    },
})
