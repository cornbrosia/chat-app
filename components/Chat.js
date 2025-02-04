import React, { useState, useEffect } from "react";
import { View, Platform, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Welcome to the chat!",
        createdAt: new Date(),
        system: true, // System message (not from a user)
      },
      {
        _id: 2,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000", // Black for sent messages
          },
          left: {
            backgroundColor: "#FFF", // White for received messages
          },
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1 }}
        renderBubble={renderBubble}
      />
      
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : (
        <KeyboardAvoidingView behavior="padding" />
      )}
    </View>
  );
};

export default Chat;
