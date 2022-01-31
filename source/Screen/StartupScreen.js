import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInUser } from "../Store/action/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const checkifLoggedIn = async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(LoggedInUser(user.uid));
        props.navigation.navigate("Home");
      } else {
        props.navigation.navigate("Login");
      }
    });
  };

  useEffect(() => {
    checkifLoggedIn();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StartupScreen;
