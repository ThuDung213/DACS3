// import { Link } from 'expo-router';
import { View, Text, TouchableOpacity } from "react-native";
import groups from "../../../../constants/FakeGroupChat";
import { useNavigation } from "@react-navigation/native";
import Mesengers from "../../../../components/common/cards/mesengers/Mesengers";
function Messages() {
  const navigation = useNavigation();
  
  return (
    <View>
      {groups.map((group) => {
        return (
          <TouchableOpacity key={group.key}>
            <Mesengers groupChat={group}  handleNavigate={()=>{
              navigation.navigate("Chat", {
                name: group.name,
              })
            }} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default Messages;


