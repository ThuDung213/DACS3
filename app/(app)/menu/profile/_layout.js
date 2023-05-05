import { Stack, Tabs, useRouter } from "expo-router";
import { COLORS, icons } from "../../../../constants";
import { FontAwesome } from "@expo/vector-icons";
import { ScreenHeaderBtn } from "../../../../components";
import EditProfile from "./editProfile";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
export default () => {
    const router = useRouter();
    const navigation = useNavigation();
    const { colors } = useTheme();
    return (
        <Stack>
            <Stack.Screen name='index' options={{
                headerTitle: "",
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerShadowVisible: false,
                headerTintColor: colors.text,
                headerLeft: () => (
                    <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                ),
                headerRight: () => (
                    <FontAwesome.Button
                        name="edit"
                        size={25}
                        backgroundColor="#fff"
                        color="#000"
                        onPress={() => {
                            navigation.navigate("editProfile");
                            console.log("clicked")
                        }}

                    />
                )
            }} />
            <Stack.Screen
                name='editProfile'
                options={{
                    title: "",
                }}
                backgroundColor="#fff"
            />
            {/* <Stack.Screen name='[id]' options={{ title: "Profile Details" }} /> */}
        </Stack>
    );
}
