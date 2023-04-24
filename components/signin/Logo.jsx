import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native-web'
import { TextInput } from 'react-native-gesture-handler'

export default function Logo() {
    return (
        <View style={styles.img}>
            <Image
                source={require('../../assets/images/REG.avif')}
                style={{ width: 400, height: 300 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
})