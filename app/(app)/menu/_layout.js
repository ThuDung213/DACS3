import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
//use @react-navigation/material-bottom-tabs react-native-paper react-native-vector-icons
export default () => {
    return (
        <Tabs screenOptions={{ tabBarShowLabel: false, tabBarActiveTintColor: 'rgb(255, 119, 84)' }}>
            <Tabs.Screen name='home' options={{
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="home" size={24} color={color} />
                ),
            }}
            />
            <Tabs.Screen name='messages' options={{
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="wechat" size={24} color={color} />
                ),
                headerShown: false,
            }}
            />
             <Tabs.Screen name='forum' options={{
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="star" size={24} color={color} />
                ),
                headerShown: false,
            }}
            />
            <Tabs.Screen name='profile' options={{
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="user-circle-o" size={24} color={color} />
                ),
                title: "Profile"
            }}
            />
        </Tabs>
    )
}