import { Stack, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import * as Font from "expo-font";
 // If using an older version of Expo
import "../global.css";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { Text } from "react-native";

async function loadFonts() {
  await Font.loadAsync({
    "Poppins-Regular": require("../assets/fonts/PublicSans-VariableFont_wght.ttf"),
    "PlayFair":require("../assets/fonts/Aladin-Regular.ttf")
   
     
    
  });
}

function ProtectedLayout() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    } else {
      router.replace("/(tabs)");
    }
  }, [user]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading</Text> // Show a loading screen until fonts load
  }

  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
