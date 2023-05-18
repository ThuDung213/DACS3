import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import styles from "./postcard.style";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { useState, useEffect } from "react";
import { User } from "../../../../app/(app)/menu/profile/User";
import Icon from "react-native-vector-icons/FontAwesome";

const Button = ({ onPress, style, color, icon }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Icon name={icon} size={24} color={color} />
  </TouchableOpacity>
);

export default function PostCardItem({
  item,
  title,
  desc,
  userPost,
  onEdit,
  onDelete,
  currentUser,
  onComment,
  onHeart,
  colorHeart,
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
      {console.log(item)}
      {userPost !== currentUser ? (
        <Card style={styles.item}>
          <View style={styles.postItem}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text> {desc}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                onPress={onHeart}
                icon="heart"
                color={item.isSaved == undefined ? "white" : "red"}
                style={{ paddingTop: 4, marginRight: 16 }}
              />
              <Button
                icon="comment"
                color="#73788B"
                onPress={onComment}
                style={{ paddingTop: 4 }}
              />
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
              <Button onPress={onDelete} icon="trash" color="red" />
            </View>
          </View>
          <View style={styles.postItem}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text> {desc}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                onPress={onHeart}
                icon="heart"
                color={item.isSaved == undefined ? "white" : "red"}
                style={{ paddingTop: 4, marginRight: 16 }}
              />
              <Button
                icon="comment"
                color="#73788B"
                onPress={onComment}
                style={{ paddingTop: 4 }}
              />
            </View>
          </View>
        </Card>
      )}
    </View>
  );
}
