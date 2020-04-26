import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AddButton() {

  return (
      <View style={styles.roundButton}>
        <Text style={styles.buttonText}>+</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    elevation: 20,
  },
  roundButton: {
    backgroundColor: "#577FF1",
    flex: 1,
    borderRadius: 50,
    margin: 12,
    width: 52,
    height: 52,
    textAlign: "center",
    justifyContent: "center",
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    elevation: 5,
  },
  buttonText: {
    flex: 1,
    alignSelf: "center",
    color: "#FFF",
    fontSize: 37,
  },
});
