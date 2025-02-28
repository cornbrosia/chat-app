import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState(""); // Store user’s name
  const [bgColor, setBgColor] = useState("#FFFFFF"); // Default background color

  // Function to handle anonymous sign-in
  const handleSignIn = () => {
    if (!name.trim()) {
      Alert.alert("Please enter a name before continuing.");
      return;
    }

    const auth = getAuth(); // Initialize Firebase Auth
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid, // Unique user ID
          name, // User’s chosen name
          bgColor, // Selected background color (expand later)
        });
      })
      .catch((error) => {
        Alert.alert("Sign-in failed", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* Start Chatting Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Start;
