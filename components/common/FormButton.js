import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
// import {windowHeight, windowWidth} from '../utils/Dimentions';

const FormButton = ({ buttonTitle, ...rest }) => {
    return (
        <TouchableOpacity style={styles.commandButton} {...rest}>
            <Text style={styles.panelButtonTitle}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
};

export default FormButton;

const styles = StyleSheet.create({
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
});