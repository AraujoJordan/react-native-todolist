import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TodoList from "./src/components/TodoList.jsx";
import EditTask from "./src/components/EditTask.jsx";
import * as firebase from "firebase/app";



export default createAppContainer(
  createStackNavigator(
    {
      TodoList: { screen: TodoList },
      EditTask: { screen: EditTask },
    },
    {
      initialRouteName: "TodoList",
      theme:'dark',
      defaultNavigationOptions: {
        headerShown: false,
      },
    }
  )
);
