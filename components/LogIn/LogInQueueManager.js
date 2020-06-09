import React, { useState, Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

function LogInQueueManager({ logIn, toggleLogInSignUp }) {
  const [password, setPassword] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View style={styles.logInContainer}>
      <Text style={styles.logInTitleText}>Log In</Text>
      <View style={styles.logInFieldTextContainer}>
        <Text style={styles.logInFieldText}>User Name</Text>
        <TextInput
          style={styles.inputField}
          placeholder=""
          onChangeText={(value) => setPhoneNumber(value)}
        />
      </View>
      <View style={styles.logInFieldTextContainer}>
        <Text style={styles.logInFieldText}>Password</Text>
        <TextInput
          style={styles.inputField}
          placeholder=""
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <View style={styles.logInFieldBtnContainer}>
        <TouchableOpacity
          style={styles.signInBtn}
          onPress={() => logIn(phoneNumber, password)}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgotPasswordBtn}
          onPress={toggleLogInSignUp}
        >
          <Text>Dont have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LogInQueueManager;

const styles = StyleSheet.create({
  logInContainer: {
    // borderColor: "#eeee",
    // borderStyle: "solid",
    // borderWidth: 1,
    // padding: 30,
  },
  logInFieldTextContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  logInFieldBtnContainer: {
    display: "flex",
    marginTop: 15,
    flexDirection: "row-reverse",
  },
  signInBtn: {
    borderColor: "#eeee",
    borderStyle: "solid",
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 9,
  },
  forgotPasswordBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  logInTitleText: {
    fontSize: 25,
  },
  logInFieldText: {
    fontSize: 15,
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    borderWidth: 0.5,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#cccc",
  },
});
