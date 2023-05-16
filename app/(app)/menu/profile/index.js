import { SafeAreaView, ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../../../../config/firebase'
import { useRouter } from 'expo-router';
import { useNavigation } from "@react-navigation/native";
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import { User } from "./User"

import { FontAwesome5 } from '@expo/vector-icons';
import { set } from 'react-native-reanimated';

const Profile = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const currentUser = new User();
        currentUser.getUser().then(() => {
            setUser(currentUser);
            // console.log("image", user?.image)
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: user?.image
                        }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={styles.title}>{user?.username}</Title>
                        <Caption style={styles.caption}>@{user?.username}</Caption>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <FontAwesome5 name="map-marker-alt" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{user?.address}</Text>
                </View>
                <View style={styles.row}>
                    <FontAwesome5 name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{user?.phone}</Text>
                </View>
                <View style={styles.row}>
                    <FontAwesome5 name="envelope" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{user?.email}</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={styles.infoBox}>
                    <Title>$140</Title>
                    <Caption>Wallet</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title>12</Title>
                    <Caption>Orders</Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <FontAwesome5 name="heart" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Your Favorites</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <FontAwesome5 name="credit-card" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Payment</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <FontAwesome5 name="share" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Tell Your Friends</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <FontAwesome5 name="headset" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Support</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <FontAwesome5 name="tools" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Setting</Text>
                    </View>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        marginTop: 15,
        marginBottom: 5,
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor: '#dddddd',
        borderRightWidth: 1,
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});
