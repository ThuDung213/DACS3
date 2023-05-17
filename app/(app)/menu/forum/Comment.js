import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Comment({ showComment, onAddComment, onDismiss, children }) {


    return (
        <View
            onDismiss={onDismiss}
            showComment={showComment}
        >
            <View >
                {children}
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around',marginHorizontal:10 }}>
                <TouchableOpacity style={{backgroundColor:'aqua',borderRadius:10,height:30,width:100}} onPress={onAddComment}>
                    <Text style={{alignSelf:'center',fontWeight:'bold',flex:1,justifyContent:'center'}}>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={{backgroundColor: 'red',borderRadius:10,height:30,width:100}} onPress={onDismiss} >
                    <Text style={{alignSelf:'center',fontWeight:'bold',flex:1,justifyContent:'center'}}>Cancel</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
