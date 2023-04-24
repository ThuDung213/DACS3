import { StyleSheet, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function LoginInput() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <KeyboardAvoidingView style={styles.inputGroup}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={25} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name="key" size={25} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    inputGroup: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: "80%",
        padding: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 10,
    },
    input: {
        padding: 15,
        fontSize: 18,
        flex: 1,
        paddingLeft: 25,
        alignItems: "flex-start"
    },
    icon: {
        // marginRight: 10,
        color: "#dededc"
    },
})
