import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground, Platform, Alert } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { Stack } from 'expo-router';
import { Storage } from 'expo-storage';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import FormButton from '../../../../components/common/FormButton'
import { v4 } from 'uuid';
import { auth, database, storage } from '../../../../config/firebase';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import BottomSheetBehavior from 'reanimated-bottom-sheet';
function EditProfile() {
    const user = auth.currentUser;
    const { colors } = useTheme();
    const bs = React.createRef();
    const fall = new Animated.Value(1);
    const [image, setImage] = useState('https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80');
    const [userData, setUserData] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [docId, setDocId] = useState(null);


    useEffect(() => {
        const requestPermission = async () => {
            if (Platform.OS !== 'web') {
                const { granted } = await ImagePicker.requestCameraPermissionsAsync();
                if (!granted) {
                    alert('Permission denied');
                }
            }
        };
        requestPermission();
    }, []);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadImage(result.assets[0].uri)
                .then(() => {
                    Alert.alert("Success");
                })
                .catch((error) => {
                    Alert.alert(error);
                })
            bs.current.snapTo(1);
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadImage(result.assets[0].uri)
                .then(() => {
                    Alert.alert("Success");
                })
                .catch((error) => {
                    Alert.alert(error);
                })
            bs.current.snapTo(1);
        }
    };

    const uploadImage = async (uri) => {
        try {
            const imageRef = ref(storage, `images/{${v4()}}.jpeg`);
            const response = await fetch(uri);
            const bytes = await response.blob();
            const snapshot = await uploadBytes(imageRef, bytes);
            console.log('Image uploaded successfully:', snapshot.metadata.fullPath);
            // const downloadURL = await snapshot.ref.getDownloadURL();
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };


    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={takePhoto}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
                <Text style={styles.panelButtonTitle} >Choose from Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle}></View>
            </View>
        </View>
    );

    const getUser = async () => {
        const q = query(collection(database, 'users'), where('_id', "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setDocId(doc.id);
            setUserData(doc.data());
        });
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleUpdate = async () => {
        // let imgUrl = await uploadImage();

        // if (imgUrl == null && userData.image != "") {
        //     return imgUrl = userData.image;
        // }
        const data = {
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            bio: userData.bio,
            address: userData.address,
            // image: imgUrl,
        }

        const userRef = doc(database, 'users', docId);
        await updateDoc(userRef, data)
            .then(() => {
                console.log("User Updated");
                Alert.alert(
                    'Profile Updated',
                    'Your profile has been updated',
                );
            })
    }


    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bs}
                snapPoints={[330, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}

            />
            <Animated.View style={{
                margin: 20,
                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0))
            }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                        <View style={{
                            height: 100,
                            width: 100,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {image && <ImageBackground
                                source={{
                                    uri: image,
                                }}
                                style={{ height: 100, width: 100 }}
                                imageStyle={{ borderRadius: 15 }}
                            >
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Ionicons name="camera-outline" size={35} color="#fff" style={{
                                        opacity: 0.7,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 10,
                                    }} />
                                </View>
                            </ImageBackground>}
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontSize: 10, fontWeight: 'bold' }}>
                        {userData ? userData.username : ''}
                    </Text>
                    {/* <Text> {user.uid}</Text> */}
                </View>

                <View style={styles.action}>
                    <FontAwesome name="user-o" size={20} color={colors.text} />
                    <TextInput
                        placeholder='Full Name'
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        value={userData ? userData.username : ''}
                        onChangeText={(text) => setUserData({ ...userData, username: text })}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="envelope-o" size={20} color={colors.text} />
                    <TextInput
                        placeholder='Email Address'
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        keyboardType='email-address'
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        value={userData ? userData.email : ''}
                        onChangeText={(text) => setUserData({ ...userData, email: text })}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="phone" size={20} color={colors.text} />
                    <TextInput
                        placeholder='Phone Number'
                        placeholderTextColor="#666666"
                        keyboardType='number-pad'
                        autoCorrect={false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        value={userData ? userData.phone : ''}
                        onChangeText={(text) => setUserData({ ...userData, phone: text })}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="map-marker" size={20} color={colors.text} />
                    <TextInput
                        placeholder='Address'
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        value={userData ? userData.address : ''}
                        onChangeText={(text) => setUserData({ ...userData, address: text })}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="book" size={20} color={colors.text} />
                    <TextInput
                        placeholder='Bio'
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        value={userData ? userData.bio : ''}
                        onChangeText={(text) => setUserData({ ...userData, bio: text })}
                    />
                </View>
                <FormButton buttonTitle="Update" onPress={handleUpdate} />
            </Animated.View>
        </View>
    )
}

export default EditProfile;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        paddingLeft: 15,
    },
});