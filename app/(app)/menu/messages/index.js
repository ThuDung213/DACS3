// import { Link } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Chat from './Chat';
import { useNavigation } from "@react-navigation/native";
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
const Messages = () => {
    const navigation = useNavigation();
    const router = useRouter()
    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
            >
                <Entypo name="chat" size={24}  />
            </TouchableOpacity>
        </View>
    );
};

export default Messages;