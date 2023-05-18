import { Text, TextInput, View, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Image, Platform } from "react-native";
import { COLORS } from "../../constants";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";




export default function SignUp({ onPress }) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const uid = user.uid;
                    addDoc(collection(database, 'users'), {
                        _id: uid,
                        email: user.email,
                        username: username,
                        address: '',
                        image: null,
                        phone: '',
                        bio: '',
                    });
                });

            console.log('Account created!');
        } catch (error) {
            setErrorMessage(error.message);
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.whiteList }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.whiteList },
                    headerShadowVisible: false,
                    headerTitle: ""
                }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <Image
                        source={require('../../assets/images/10.jpg')}
                        style={{ marginTop: 15, width: 300, height: 200 }}
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
                                placeholder="Username"
                                value={username}
                                onChangeText={(username) => { setUsername(username) }} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="key" size={25} style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password" secureTextEntry
                                value={password}
                                onChangeText={(value) => { setPassword(value) }} />
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
            </ScrollView>
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