import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
} from "react-native";
import DoneIcon from "../../assets/DoneIcon";

export default function ListItem({ item,removeAction }) {

  const [itemElement, setItem] = useState({item:item,removeAction:removeAction});

  return (
    <View style={styles.item}>
      <TouchableNativeFeedback
        onPress={() => {
          console.log("Item clicked " + itemElement.item.checked);
          itemElement.item.checked = !itemElement.item.checked;
          setItem({ ...itemElement });
        }}
      >
        <View style={styles.itemCheckHolder}>
          <DoneIcon style={{ opacity: itemElement.item.checked ? 1 : 0 }} />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        style={styles.clickableItem}
        onLongPress={() => {
          console.log("Long Item clicked "+JSON.stringify(item));
          itemElement.removeAction(item);
        }}
      >
        <View style={styles.itemTexts}>
          <Text style={styles.itemTitle}>{itemElement.item.title}</Text>
          <Text style={styles.itemDescription}>{itemElement.item.text}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  clickableItem: {
    width: 300,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  itemCheckHolder: {
    width: 28,
    height: 28,
    backgroundColor: "#4E5565",
    borderRadius: 20,
    marginEnd: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  itemTexts: {
    width: "100%",
    flexDirection: "column",
  },
  itemTitle: {
    color: "#FFF",
    fontSize: 16,
  },
  itemDescription: {
    marginTop: 4,
    color: "#5A6173",
    fontSize: 14,
  },
});
