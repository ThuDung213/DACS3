// import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
const Messages = () => {
    return (
        <View>
            <Link href="/menu/messages/123" style={{ margin: 10, fontSize: 24 }}>Messages with Junjun</Link>
            <Text href="/menu/messages/345" style={{ margin: 10, fontSize: 24 }}>messages with Luka</Text>

            <Text href="/menu/messages/678" style={{ margin: 10, fontSize: 24 }}>messages with Alex </Text>
        </View>
    );
};

export default Messages;