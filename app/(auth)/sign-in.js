import { Text, TextInput, View, StyleSheet, Image, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/auth";
import { Logo, SigninButton } from "../../components";
import { COLORS, icons, images, SIZES } from "../../constants";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { ScrollView } from "react-native-gesture-handler";


export default function SignIn({ onPress }) {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Signed in!")
                const user = userCredential.user;
            })
            .catch(error => {
                console.log(error)
            })
        console.log(email);
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.whiteList }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.whiteList },
                    headerShadowVisible: false,
                    headerTitle: ""
                }} />
            <ScrollView>
                <KeyboardAvoidingView style={styles.container}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <Image
                        source={require('../../assets/images/10.jpg')}
                        style={{ marginTop: 15, width: 300, height: 200 }}
                    />
                    <Text style={styles.wel}>Welcome back!</Text>

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


                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.container} onPress={handleSignIn}>
                            <Text style={styles.signIn}>Sign In</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.account}>
                        <Text style={styles.acc}>
                            You're new here? &nbsp;
                            <Text style={[styles.acc, styles.link]} onPress={() => { router.push("/sign-up") }}>SignUp</Text>
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