import {  Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';
import styles from './postcard.style';
import { Feather } from '@expo/vector-icons';

const Button = ({ onPress, style, icon }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Feather name={icon} size={24} />
  </TouchableOpacity>
)

export default function PostCardItem({ title, desc, onEdit, onDelete,currentUser }) {
  return (
    <Card style={styles.item}>
      <View style={styles.rowView}>
          <Button
            onPress={onEdit}
            icon="edit"
            style={{ marginHorizontal: 16 }} />
          <Button onPress={onDelete} icon='trash-2' />
      </View>
      <View style={styles.postItem}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text> {desc}</Text>
        </View>
      </View>
    </Card>
  )
}
