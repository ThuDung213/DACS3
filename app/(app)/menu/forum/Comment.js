import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

export default function Comment({ showComment, onAddComment, onDismiss, children }) {

    // if (!showComment) {
    //     return null;
    // }

    return (
        <View
            onDismiss={onDismiss}
            showComment={showComment}
        >
            <View >
                {children}
            </View>
            <View>
                <Button title="Add Comment" onPress={onAddComment} />
            </View>

        </View>
    );
}
