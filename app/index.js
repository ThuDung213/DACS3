import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome
} from "../components"
import { auth } from "../config/firebase"
import { signOut } from "firebase/auth";

const Home = () => {

  // async function handleSignOut() {
  //   try {
  //     await signOut(auth);
  //     router.replace('/sign-in');
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("")
  // const { signOut } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: ""
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
      {/* //check later */}
      {/* <Text onPress={handleSignOut()}>Sign Out</Text> */}
    </SafeAreaView>
  )
}

export default Home;