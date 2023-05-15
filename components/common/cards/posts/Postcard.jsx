import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./postcard.style";

const PopularJobCard = ({ post, handleActivity }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      //   onPress={() => handleCardPress(post)}
    >
      <View>
        <Image />
        <View  style={styles.function}>
          <TouchableOpacity>
            <FontAwesome
              name="pencil"
              style={{ marginRight: 10, fontSize: 17 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleActivity}>
            <FontAwesome
              name="trash"
              color="#d60505"
              style={{ marginRight: 10, fontSize: 17 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.postTitle}>{post.title}</Text>

      <View>
        <Text numberOfLines={1} style={styles.postDesc}>
          {post.desc}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
