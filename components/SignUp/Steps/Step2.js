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

function Step2({
  forwardState,
  backState,
  callSignIn,
  updateZip,
  zipCode,
  updateAddress,
  address,
}) {
  return (
    <React.Fragment>
      <Text style={styles.signUpTitleText}>Verified!</Text>
      <Text style={styles.signUpSimpleText}>
        Please Enter your Address and ZIP Code.
      </Text>
      <View style={styles.signUpFieldTextContainer}>
        <Text style={styles.signUpFieldText}>Address: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => updateAddress(text)}
          value={address}
          placeholder="1234 Some Street"
        />
      </View>
      <View style={styles.signUpFieldTextContainer}>
        <Text style={styles.signUpFieldText}>ZIP/Postal Code: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => updateZip(text)}
          value={zipCode}
          placeholder="78748"
        />
      </View>
      <View style={styles.signUpFieldBtnContainer}>
        <View style={styles.signUpFieldBtnContainer}>
          <TouchableOpacity onPress={forwardState} style={styles.signInBtn}>
            <Text>Create Account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpFieldBtnContainer}>
          <TouchableOpacity onPress={backState} style={styles.skipBtn}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
}

export default Step2;

const styles = StyleSheet.create({
  signUpContainer: {
    borderColor: "#eeee",
    borderStyle: "solid",
    borderWidth: 1,
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
  },
  forgotPasswordBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  signUpTitleText: {
    fontSize: 25,
  },
  signUpFieldText: {
    fontSize: 15,
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
