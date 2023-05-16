import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import styles from "./postcard.style";
import { Feather } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { useState, useEffect } from "react";
import { User } from "../../../../app/(app)/menu/profile/User";
const Button = ({ onPress, style, icon }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Feather name={icon} size={24} />
  </TouchableOpacity>
);

export default function PostCardItem({
  title,
  desc,
  userPost,
  onEdit,
  onDelete,
  currentUser,
}) {
  const [user, setUser] = useState(null);
  React.useEffect(() => {
    const currentUser = new User();
    currentUser.getUser().then(() => {
      setUser(currentUser);
    });
  }, []);
  return (
    <View>
      {userPost !== currentUser ? (
        <Card style={styles.item}>
          <View style={styles.postItem}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text> {desc}</Text>
            </View>
          </View>
        </Card>
      ) : (
        <Card style={styles.item}>
          <View style={styles.containerActi}>
            <View style={styles.user}>
              <Avatar.Image
                source={{
                  uri: user?.image,
                }}
                size={40}
              />
              <Text style={styles.username}>{user?.username}</Text>
            </View>
            <View style={styles.rowView}>
              <Button
                onPress={onEdit}
                icon="edit"
                style={{ marginHorizontal: 16 }}
              />
              <Button onPress={onDelete} icon="trash-2" color="red"/>
            </View>
          </View>
          <View style={styles.postItem}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text> {desc}</Text>
            </View>
          </View>
        </Card>
      )}
    </View>
  );
}
