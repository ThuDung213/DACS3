import { Stack, useRouter } from "expo-router";
import { ScreenHeaderBtn } from "../../../../components";
import { icons } from "../../../../constants";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/core";


export default () => {
    const router = useRouter();
    const navigation = useNavigation();
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    title: "Forum"
                }}
            />
        </Stack>
    );
}
