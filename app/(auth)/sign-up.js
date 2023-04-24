import { Text, TextInput, View, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Image, Platform } from "react-native";
import { useAuth } from "../../context/auth";
import { Logo } from "../../components";
import { COLORS } from "../../constants";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons'
import { ScrollView } from "react-native-web";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";



export default function SignUp({ onPress }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [comfirmpassword, setConfirmPassword] = useState('')
    const [validateMessage, setValidationMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    let validateAndSet = (value, valueToCompare, setValue) => {
        value !== valueToCompare ? setValidationMessage('Password does not match')
            : setValidationMessage('')
        setValue(value)
    }

    const handleSignup = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Account created!')
                const user = userCredential.user;
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: ""
                }} />
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Image
                    source={require('../../assets/images/signup.avif')}
                    style={{ width: 400, height: 300 }}
                />
                <Text style={styles.wel}>Welcome to Our App!</Text>

                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={25} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={(email1) => { setEmail(email1) }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Ionicons name="key" size={25} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password" secureTextEntry
                            value={password}
                            onChangeText={(value) => validateAndSet(value, comfirmpassword, setPassword)} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Ionicons name="key" size={25} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password" secureTextEntry
                            value={comfirmpassword}
                            onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} />
                    </View>
                </View>


                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.container} onPress={handleSignup} >
                        <Text style={styles.signUp}>Sign Up</Text>
                    </TouchableOpacity>
                    {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                </View>

                <View style={styles.account}>
                    <Text style={styles.acc}>
                        You're new here? &nbsp;
                        <Text style={[styles.acc, styles.link]} onPress={() => { router.push("/sign-in") }}>Sign In</Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.lightWhite
    },
    wel: {
        fontSize: 25,
        textAlign: 'center',
        margin: 7,
        fontWeight: 'bold'
    },
    account: {
        alignItems: "center",
        marginTop: 20,
        fontSize: 18,
    },
    acc: {
        fontWeight: "bold",
    },
    link: {
        color: "lightblue"
    },
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
        marginLeft: 30,
        marginRight: 30,
    },
    input: {
        padding: 12,
        fontSize: 18,
        flex: 1,
        paddingLeft: 25,
        alignItems: "flex-start"
    },
    icon: {
        // marginRight: 10,
        color: "#dededc"
    },
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
    signUp: {
        fontSize: 18,
        backgroundColor: "lightblue",
        paddingVertical: 13,
        paddingHorizontal: 30,
    },
    img: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessage: {
        color: 'red',
        marginTop: 10,
    },
})