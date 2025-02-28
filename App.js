import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Start from "./components/Start";  // Assuming Start.js is the welcome screen
import Chat from "./components/Chat";  // Assuming Chat.js is the chat screen
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { LogBox } from 'react-native';
import { getAuth } from "firebase/auth";

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]); // Ignore warning

// Firebase Configuration (DO NOT expose API keys in public repositories)
const firebaseConfig = {
  apiKey: "AIzaSyCVp4i7HG93dcWRCZJhn-eXCjfIgfmKV8Y",
  authDomain: "chat-bd2d0.firebaseapp.com",
  projectId: "chat-bd2d0",
  storageBucket: "chat-bd2d0.firebasestorage.app",
  messagingSenderId: "82455856439",
  appId: "1:82455856439:web:5979fd94b40e38111c46b2",
  measurementId: "G-6YTGCPY3WJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start">
          {(props) => <Start auth={auth} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} auth={auth} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
