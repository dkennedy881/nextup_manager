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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

function LogInQueueManager({ logIn, toggleLogInSignUp, callResetPassword }) {
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const sendPassword = async () => {
    await callResetPassword(username);
    alert("Password Sent!");
    setShowPassword(!showPassword);
  };

  if (showPassword) {
    return (
      <TouchableWithoutFeedback
        style={styles.logInContainer}
        onPress={Keyboard.dismiss}
      >
        <View>
          <Text style={styles.logInTitleText}>Forgot Password</Text>
          <Text style={styles.logInTitleTextSub}>
            Please enter your account password
          </Text>
          <View style={styles.logInFieldTextContainer}>
            <Text style={styles.logInFieldText}>Email</Text>
            <TextInput
              style={styles.inputField}
              placeholder=""
              defaultValue={username}
              onChangeText={(value) => setUsername(value)}
            />
          </View>
          <View style={styles.logInFieldBtnContainer}>
            <TouchableOpacity
              style={styles.signInBtnR}
              onPress={() => sendPassword()}
            >
              <Text>Send Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signInBtnL}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <TouchableWithoutFeedback
        style={styles.logInContainer}
        onPress={Keyboard.dismiss}
      >
        <View>
          <Text style={styles.logInTitleText}>Log In</Text>
          <View style={styles.logInFieldTextContainer}>
            <Text style={styles.logInFieldText}>Email</Text>
            <TextInput
              style={styles.inputField}
              placeholder=""
              defaultValue={username}
              onChangeText={(value) => setUsername(value)}
            />
          </View>
          <View style={styles.logInFieldTextContainer}>
            <Text style={styles.logInFieldText}>Password</Text>
            <TextInput
              style={styles.inputField}
              placeholder=""
              defaultValue={password}
              onChangeText={(value) => setPassword(value)}
            />
          </View>
          <View style={styles.logInFieldBtnContainer}>
            <TouchableOpacity
              style={styles.signInBtnR}
              onPress={() => logIn(username, password)}
            >
              <Text>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signInBtnL}
              onPress={toggleLogInSignUp}
            >
              <Text>Dont have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logInFieldBtnContainer}>
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.signInBtnCenterContainer}
            >
              <Text style={styles.signInBtnCenter}>Forgot password ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default LogInQueueManager;

const styles = StyleSheet.create({
  logInContainer: {
    // borderColor: "#eeee",
    // borderStyle: "solid",
    // borderWidth: 1,
    // padding: 30,
    // width: "auto",
    alignSelf: "stretch",
    display: "flex",
  },
  logInFieldTextContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
    width: 300,
  },
  logInFieldBtnContainer: {
    display: "flex",
    marginTop: 15,
    flexDirection: "row-reverse",
  },
  logInFieldBtnContainer1: {
    display: "flex",
    marginTop: 15,
    flexDirection: "row",
  },
  signInBtnL: {
    borderColor: "#eeee",
    borderStyle: "solid",
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 9,
    marginRight: 5,
  },
  signInBtnR: {
    borderColor: "#eeee",
    borderStyle: "solid",
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 9,
    marginLeft: 5,
  },
  signInBtnCenter: {
    textAlign: "center",
  },
  signInBtnCenterContainer: {
    flex: 1,
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
  logInTitleTextSub: {
    fontSize: 15,
    marginTop: 10,
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
