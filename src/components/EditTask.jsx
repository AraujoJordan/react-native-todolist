import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import AddButton from "./AddButton";

export default function EditTask() {
  return (
    <View style={styles.container}>
      <TextInput></TextInput>
      <TextInput></TextInput>
      <View style={styles.content}>
        <View style={styles.card3}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#010A20",
    justifyContent: "center",
  },
  appBar: {
    flex: 1,
    alignSelf: "flex-start",
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
  content: {
    flex: 1,
    marginTop: 10,
    marginVertical: 8,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  list: {
    flexGrow: 1,
  },
  card3: {
    width: "100%",
    backgroundColor: "#262E41",
    borderRadius: 20,
    marginTop: 10,
    padding: 20,
    shadowOpacity: 1.0,
    shadowRadius: 5.0,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    elevation: 5,
  },
});
