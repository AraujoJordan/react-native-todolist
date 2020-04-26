import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

export default function Header() {
  return (
    <View style={styles.appBar}>
      <StatusBar barStyle="light-content" backgroundColor="#010A20" />
      <Text style={styles.title}>TodoList</Text>
      <Text style={styles.description}>Your favorite TodoList app</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    // flex: 1,
  },
  title: {
    color: "#fff",
    marginStart: 12,
    marginTop: 6,
    fontSize: 24,
  },
  description: {
    color: "#aaa",
    marginStart: 12,
    marginTop: 6,
    fontSize: 18,
  },
});
