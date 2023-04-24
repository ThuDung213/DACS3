import { StyleSheet, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'

export default function SignupInput() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [comfirmpassword, setConfirmPassword] = useState('')
    const [validateMessage, setValidationMessage] = useState('')

    let validateAndSet = (value, valueToCompare, setValue) => {
        value !== valueToCompare ? setValidationMessage('Password does not match')
            : setValidationMessage('')
        setValue(value)
    }
    return (
        <KeyboardAvoidingView style={styles.inputGroup}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Name" />
            </View>

            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Email" />
            </View>

            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(value) => validateAndSet(value, comfirmpassword, setPassword)} />
            </View>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} />
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
    input: {
        padding: 12,
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 18,
        borderRadius: 20,
    },

})