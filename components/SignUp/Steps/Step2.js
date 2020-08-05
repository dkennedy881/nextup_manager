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

import RNPickerSelect from "react-native-picker-select";

function Step2({
  forwardState,
  backState,
  callSignIn,
  updateZip,
  zipCode,
  updateAddress,
  address,
  updatePhoneNumber,
  phoneNumber,
  state,
  updateState,
  city,
  updateCity,
}) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpTitleText}>Account Created!</Text>
        {/* <Text style={styles.signUpTitleText}>
          Please enter additional business information. All fields are required.
        </Text> */}
        <Text style={styles.signUpSimpleText}>
          Please enter additional business information. All fields are required.
        </Text>
        <View style={styles.signUpFieldTextContainer}>
          {/* <Text style={styles.signUpFieldText}>Phone Number</Text> */}
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => updatePhoneNumber(text)}
            value={phoneNumber}
            placeholder="Business Phone Number"
            // textContentType={"telephoneNumber"}
            // dataDetectorTypes={"phoneNumber"}
            autoCompleteType={"tel"}
          />
        </View>
        <View style={styles.signUpFieldTextContainer}>
          {/* <Text style={styles.signUpFieldText}>Address: </Text> */}
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => updateAddress(text)}
            value={address}
            placeholder="Address"
          />
        </View>
        <View style={styles.signUpFieldTextContainer}>
          {/* <Text style={styles.signUpFieldText}>State: </Text> */}
          {/* <TextInput
          style={styles.inputField}
          onChangeText={(text) => updateState(text)}
          value={state}
          placeholder=""
        /> */}
          <View style={styles.inputField}>
            <RNPickerSelect
              onValueChange={(value) => {
                if (value) {
                  const city = value.split(",")[0].trim();
                  const state = value.split(",")[1].trim();
                  updateCity(city);
                  updateState(state);
                }
              }}
              style={{
                inputIOS: {
                  color: "black",
                  fontSize: 20,
                  // paddingTop: 13,
                  // paddingHorizontal: 10,
                  // paddingBottom: 12,
                },
              }}
              placeholder={{
                label: "Select a city...",
                value: null,
                disabled: true,
              }}
              items={[
                {
                  label: "Austin, Texas",
                  value: "Austin, Texas",

                  key: "Austin, Texas",
                },
                {
                  label: "Houston, Texas",
                  value: "Houston, Texas",

                  key: "Houston, Texas",
                },
                {
                  label: "Seattle, Washington",
                  value: "Seattle, Washington",

                  key: "Seattle, Washington",
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.signUpFieldTextContainer}>
          {/* <Text style={styles.signUpFieldText}>ZIP/Postal Code: </Text> */}
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => updateZip(text)}
            value={zipCode}
            placeholder="ZIP/Postal Code"
          />
        </View>
        <View style={styles.signUpFieldBtnContainer}>
          <View style={styles.signUpFieldBtnContainer}>
            <TouchableOpacity onPress={forwardState} style={styles.signInBtn}>
              <Text style={{ color: "yellow" }}>Create Account</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signUpFieldBtnContainer}>
            <TouchableOpacity onPress={backState} style={styles.skipBtn}>
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signUpFieldTextContainer}>
          <TouchableOpacity style={styles.signInBtnNull} onPress={forwardState}>
            <Text style={{ textAlign: "center", color: "#ccc" }}>
              Step 2 of 2
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Step2;

const styles = StyleSheet.create({
  signUpContainer: {
    // borderColor: "#eeee",
    // borderStyle: "solid",
    // borderWidth: 1,
    // margin: -10,
  },
  signUpSimpleText: {
    marginTop: 15,
    fontSize: 20,
    textAlign: "center",
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
    backgroundColor: "#87c8e0",
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
  // inputField: {
  //   flex: 1,
  //   borderWidth: 0.5,
  //   borderTopColor: "transparent",
  //   borderLeftColor: "transparent",
  //   borderRightColor: "transparent",
  //   borderBottomColor: "#cccc",
  // },
  inputField: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#cccc",
    height: 50,
    padding: 10,
    fontSize: 20,
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
});
