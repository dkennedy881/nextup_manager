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
  KeyboardAvoidingView,
} from "react-native";

function Step1({
  forwardState,
  toggleLogInSignUp,
  updateName,
  name,
  password,
  passwordValidate,
  updatePassword,
  updatePasswordValidate,
  username,
  updateUsername,
}) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Text style={styles.signUpTitleText}>Let's get started...</Text>
        <View style={styles.signUpFieldTextContainer}>
          {/* <Text style={styles.signUpFieldText}>Business Name</Text> */}
          <TextInput
            value={name}
            style={styles.inputField}
            onChangeText={(text) => updateName(text)}
            placeholder="Business Name"
            textContentType={"organizationName"}
          />
        </View>
        <View style={styles.signUpFieldTextContainer}>
          {/* <Text style={styles.signUpFieldText}>Email</Text> */}
          <TextInput
            value={username}
            style={styles.inputField}
            onChangeText={(text) => updateUsername(text)}
            placeholder="Email"
            textContentType={"emailAddress"}
            autoCompleteType={"email"}
            keyboardType={"email-address"}
          />
        </View>
        <View style={styles.signUpFieldTextContainer}>
          {/* <Text style={styles.signUpFieldText}>Password</Text> */}
          <TextInput
            value={password}
            style={styles.inputField}
            onChangeText={(text) => updatePassword(text)}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.signUpFieldTextContainer}>
          {/* <Text style={styles.signUpFieldText}>Re-enter Password</Text> */}
          <TextInput
            value={passwordValidate}
            style={styles.inputField}
            onChangeText={(text) => updatePasswordValidate(text)}
            placeholder="Re-enter Password"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.signUpFieldTextContainer}>
          <TouchableOpacity style={styles.signInBtn} onPress={forwardState}>
            <Text style={{ textAlign: "center", color: "yellow" }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpFieldTextContainer}>
          <TouchableOpacity style={styles.signInBtnNull} onPress={forwardState}>
            <Text style={{ textAlign: "center", color: "#ccc" }}>
              Step 1 of 2
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpFieldTextContainer}>
          <View
            style={{
              width: "100%",
              borderColor: "#eee",
              borderBottomWidth: 1,
            }}
          ></View>
        </View>
        <View style={styles.signUpFieldTextContainer}>
          <TouchableOpacity style={styles.logInBtn} onPress={toggleLogInSignUp}>
            <Text style={{ textAlign: "center", color: "black" }}>
              Already have an account?{" "}
              <Text style={{ color: "#87c8e0" }}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Step1;

const styles = StyleSheet.create({
  signUpContainer: {
    padding: 30,
  },
  signUpSimpleText: {
    marginTop: 15,
  },
  skipBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  signUpFieldTextContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  signUpFieldBtnContainer: {
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
    width: "100%",
    backgroundColor: "#87c8e0",
  },
  signInBtnNull: {
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 9,
    width: "100%",
    backgroundColor: "white",
  },
  logInBtn: {
    borderColor: "transparent",
    borderStyle: "solid",
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 9,
    width: "100%",
    // backgroundColor: "salmon",
  },
  forgotPasswordBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  signUpTitleText: {
    fontSize: 25,
    textAlign: "center",
  },
  signUpFieldText: {
    fontSize: 15,
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#cccc",
    height: 50,
    padding: 10,
    fontSize: 20,
  },
});
