import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  Button,
} from "react-native";
import { User } from "../profile/User";
import { Surface, Title, TextInput } from "react-native-paper";
import ModalView from "./ModalView";
import { auth } from "../../../../config/firebase";
import { Avatar } from "react-native-paper";
import PostCardItem from "../../../../components/common/cards/posts/Postcard";
import Comment from "./Comment";
import { useRouter } from "expo-router";
// update this url -> "<new_ngrok_host_url>/posts"
const url = "http://192.168.1.8:3000/posts";
const commentUrl = " http://192.168.1.8:3000/comments";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

console.log(auth?.currentUser?.email);

export default function App() {
  const [data, setData] = useState([]);
  const [dataComment, setDataComment] = useState([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [postId, setPostId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const userEmail = auth?.currentUser?.email;
  const [showComments, setShowComments] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((e) => console.log(e));
    setLoading(false);
  };

  const getComment = async () => {
    setLoading(true);
    await fetch(commentUrl)
      .then((res) => res.json())
      .then((res) => {
        setDataComment(res);
      })
      .catch((e) => console.log(e));
    setLoading(false);
  };

  const addPost = (title, desc, userEmail) => {
    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        desc: desc,
        title: title,
        user: userEmail,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        updatePost();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editPost = (postId, title, desc) => {
    fetch(url + `/${postId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        desc: desc,
        title: title,
        user: userEmail,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log("updated:", resJson);
        updatePost();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePost = (postId) => {
    fetch(url + `/${postId}`, {
      method: "DELETE",
      headers,
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log("delete:", resJson);
        getPosts();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updatePost = () => {
    getPosts();
    setVisible(false);
    setDesc("");
    setTitle("");
    setPostId(0);
  };

  const edit = (id, title, desc) => {
    setVisible(true);
    setPostId(id);
    setTitle(title);
    setDesc(desc);
  };

  //comment
  const openCommentsScreen = (id) => {
    setPostId(id);
    setShowComments(true);
  };
  const addComment = (postId, comment) => {
    fetch(commentUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        postId: postId,
        comment: comment,
        user: userEmail,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log("post:", resJson);
        updateComment();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const updateComment = () => {
    setShowComments(false);
    setComment("");
  };

  const [user, setUser] = useState(null);
  React.useEffect(() => {
    const currentUser = new User();
    currentUser.getUser().then(() => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Surface style={styles.header}>
        <Title>Posts</Title>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.buttonText}>Add Post</Text>
        </TouchableOpacity>
      </Surface>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id + index.toString()}
        refreshing={loading}
        onRefresh={getPosts}
        renderItem={({ item }) => (
          <PostCardItem
            currentUser={userEmail}
            userPost={item.user}
            title={item.title}
            desc={item.desc}
            id={item.id}
            onEdit={() => edit(item.id, item.title, item.desc)}
            onDelete={() => deletePost(item.id)}
            onComment={() => openCommentsScreen(item.id)}
          />
        )}
      />
      <ModalView
        visible={visible}
        title="Add Post"
        onDismiss={() => setVisible(false)}
        onSubmit={() => {
          if (postId && title && desc) {
            editPost(postId, title, desc);
          } else {
            addPost(title, desc, userEmail);
          }
        }}
        cancelable
      >
        <TextInput
          label="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          mode="outlined"
        />
        <TextInput
          label="desc"
          value={desc}
          onChangeText={(text) => setDesc(text)}
          mode="outlined"
        />
      </ModalView>
      {showComments == false ? (
        <View />
      ) : (
        <Comment
          showComments={showComments}
          onDismiss={() => setShowComments(false)}
          onAddComment={() => addComment(postId, comment)}
        >
          <FlatList
            data={dataComment}
            keyExtractor={(item, index) => item.id + index.toString()}
            refreshing={loading}
            onRefresh={getComment}
            renderItem={({ item }) => (
              <View>
                {/* <View>
                  <Avatar.Image
                    source={{
                      uri: user?.image,
                    }}
                    size={40}
                  />
                  <Text>{item.comment}</Text>
                </View> */}
                <Text>oke</Text>
              </View>
            )}
          />
          <TextInput
            placeholder="Your comment"
            value={comment}
            onChangeText={(text) => setComment(text)}
            mode="outlined"
          />
        </Comment>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    marginTop: Platform.OS === "android" ? 24 : 0,
    padding: 16,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "steelblue",
  },
  buttonText: {
    color: "white",
  },
});