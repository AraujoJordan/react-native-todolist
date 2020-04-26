import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  AsyncStorage,
} from "react-native";
import Header from "./Header";
import ListItem from "./ListItem";
import AddButton from "./AddButton";
// import * as firebase from "firebase/app";

export default function TodoList(props) {
  const [todos, setTodos] = useState({
    modal: false,
    newTask: {
      title: "",
      desc: "",
    },
    list: [],
  });

  // const updateData = async () => {
  //   console.log("updateData()");
  //   try {
  //     let db = firebase.firestore();
  //     let querySnapshot = await db.collection("list").get();
  //     querySnapshot.forEach((doc) => {
  //       console.log("Doc: " + log);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // updateData();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const value = await AsyncStorage.getItem("@TodoList:app");
        if (value !== null) {
          console.log("Getting data from storage: " + value);
          setTodos({
            modal: false,
            list: JSON.parse(value).list,
            newTask: {
              title: "",
              desc: "",
            },
          });
        } else {
          console.log("Couldn't get value");
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <Modal
        style={styles.modalBackground}
        animationType="slide"
        transparent={true}
        visible={todos.modal}
        onRequestClose={() => {}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Task</Text>

            <TextInput
              borderBottomColor="white"
              placeholder="Title"
              onChangeText={(text) => {
                setTodos({
                  ...todos,
                  newTask: {
                    title: text,
                    desc: todos.newTask.desc,
                  },
                });
              }}
              style={styles.modalTitleStyle}
            ></TextInput>
            <TextInput
              borderBottomColor="white"
              placeholder="Description"
              onChangeText={(text) => {
                setTodos({
                  ...todos,
                  newTask: {
                    title: todos.newTask.title,
                    desc: text,
                  },
                });
              }}
              style={styles.modalDescriptionStyle}
            ></TextInput>

            <TouchableOpacity
              onPress={() => {
                if (todos.newTask.title == "" || todos.newTask.desc == "") {
                  alert("You should add both title and description");
                  return;
                }
                let newElement = {
                  title: todos.newTask.title,
                  text: todos.newTask.desc,
                  key: new Date().getTime().toString(),
                  checked: false,
                };
                todos.list.push(newElement);
                setTodos({
                  modal: !todos.modal,
                  list: todos.list,
                  newTask: todos.newTask,
                });
                saving(todos);
              }}
              style={{ ...styles.openButton, backgroundColor: "#577FF1" }}
            >
              <Text style={styles.textStyle}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.content}>
        <View style={styles.card1}></View>
        <View style={styles.card2}></View>
        <View style={styles.card3}>
          <FlatList
            style={styles.list}
            data={todos.list}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <ListItem
                item={item}
                removeAction={(itemToRemove) => {
                  console.log("removeAction: itemToRemove:" + JSON.stringify(itemToRemove));
                  let newTodo = {
                    modal: todos.modal,
                    list: todos.list.filter(
                      (itemx) => itemx.key != itemToRemove.key
                    ),
                    newTask: todos.newTask,
                  };

                  setTodos(newTodo);
                  saving(newTodo);
                }}
              />
            )}
          ></FlatList>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setTodos({
            modal: !todos.modal,
            list: todos.list,
            newTask: {
              title: "",
              desc: "",
            },
          });
        }}
      >
        <AddButton />
      </TouchableOpacity>
    </View>
  );
}

const saving = async (todoList) => {
  try {
    await AsyncStorage.setItem(
      "@TodoList:app",
      JSON.stringify({
        modal: false,
        newTask: { title: "", desc: "" },
        list: todoList.list,
      })
    );
    let appSaved = await AsyncStorage.getItem("@TodoList:app");
    console.log(
      "saved value: " +
        JSON.stringify({
          modal: false,
          newTask: { title: "", desc: "" },
          list: todoList.list,
        })
    );
  } catch (error) {
    console.error(error);
  }
};

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    elevation: 20,
  },
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
    marginTop: 25,
    marginVertical: 8,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card1: {
    alignSelf: "flex-start",
    width: "90%",
    position: "absolute",
    height: 100,
    backgroundColor: "#4E5565",
    borderRadius: 20,
    transform: [{ rotate: "355deg" }],
    shadowOpacity: 1.0,
    shadowRadius: 5.0,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    elevation: 5,
  },
  card2: {
    alignSelf: "flex-start",
    width: "95%",
    position: "absolute",
    height: 100,
    backgroundColor: "#31394C",
    marginTop: 5,
    borderRadius: 20,
    transform: [{ rotate: "358deg" }],
    shadowOpacity: 1.0,
    shadowRadius: 5.0,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    elevation: 5,
  },
  list: {
    flexGrow: 1,
  },
  card3: {
    width: "100%",
    minHeight: 170,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#31394C",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitleStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    borderColor: "white",
    borderBottomWidth: 1.0,
  },
  modalDescriptionStyle: {
    borderColor: "white",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    borderBottomWidth: 1.0,
  },
  modalText: {
    marginBottom: 15,
    color: "white",
    textAlign: "center",
  },
});
