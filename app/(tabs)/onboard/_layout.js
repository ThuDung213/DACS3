import { Tabs } from "expo-router";

export default function ObBoardLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="OnBoardingScreen"
            />
            <Tabs.Screen
                name="sign-in"
            />
        </Tabs>
    )
};