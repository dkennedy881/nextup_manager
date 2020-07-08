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
          {/* <Text style={styles.signUpFieldText}>City: </Text> */}
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => updateCity(text)}
            value={city}
            placeholder="City"
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
              onValueChange={(value) => updateState(value)}
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
                label: "Select a state...",
                value: null,
                disabled: true,
              }}
              items={[
                {
                  label: "Alabama",
                  value: "Alabama",

                  key: "AL",
                },
                {
                  label: "Alaska",
                  value: "Alaska",

                  key: "AK",
                },
                {
                  label: "American Samoa",
                  value: "American Samoa",

                  key: "AS",
                },
                {
                  label: "Arizona",
                  value: "Arizona",

                  key: "AZ",
                },
                {
                  label: "Arkansas",
                  value: "Arkansas",

                  key: "AR",
                },
                {
                  label: "California",
                  value: "California",

                  key: "CA",
                },
                {
                  label: "Colorado",
                  value: "Colorado",

                  key: "CO",
                },
                {
                  label: "Connecticut",
                  value: "Connecticut",

                  key: "CT",
                },
                {
                  label: "Delaware",
                  value: "Delaware",

                  key: "DE",
                },
                {
                  label: "District Of Columbia",
                  value: "District Of Columbia",

                  key: "DC",
                },
                {
                  label: "Federated States Of Micronesia",
                  value: "Federated States Of Micronesia",

                  key: "FM",
                },
                {
                  label: "Florida",
                  value: "Florida",

                  key: "FL",
                },
                {
                  label: "Georgia",
                  value: "Georgia",

                  key: "GA",
                },
                {
                  label: "Guam",
                  value: "Guam",

                  key: "GU",
                },
                {
                  label: "Hawaii",
                  value: "Hawaii",

                  key: "HI",
                },
                {
                  label: "Idaho",
                  value: "Idaho",

                  key: "ID",
                },
                {
                  label: "Illinois",
                  value: "Illinois",

                  key: "IL",
                },
                {
                  label: "Indiana",
                  value: "Indiana",

                  key: "IN",
                },
                {
                  label: "Iowa",
                  value: "Iowa",

                  key: "IA",
                },
                {
                  label: "Kansas",
                  value: "Kansas",

                  key: "KS",
                },
                {
                  label: "Kentucky",
                  value: "Kentucky",

                  key: "KY",
                },
                {
                  label: "Louisiana",
                  value: "Louisiana",

                  key: "LA",
                },
                {
                  label: "Maine",
                  value: "Maine",

                  key: "ME",
                },
                {
                  label: "Marshall Islands",
                  value: "Marshall Islands",

                  key: "MH",
                },
                {
                  label: "Maryland",
                  value: "Maryland",

                  key: "MD",
                },
                {
                  label: "Massachusetts",
                  value: "Massachusetts",

                  key: "MA",
                },
                {
                  label: "Michigan",
                  value: "Michigan",

                  key: "MI",
                },
                {
                  label: "Minnesota",
                  value: "Minnesota",

                  key: "MN",
                },
                {
                  label: "Mississippi",
                  value: "Mississippi",

                  key: "MS",
                },
                {
                  label: "Missouri",
                  value: "Missouri",

                  key: "MO",
                },
                {
                  label: "Montana",
                  value: "Montana",

                  key: "MT",
                },
                {
                  label: "Nebraska",
                  value: "Nebraska",

                  key: "NE",
                },
                {
                  label: "Nevada",
                  value: "Nevada",

                  key: "NV",
                },
                {
                  label: "New Hampshire",
                  value: "New Hampshire",

                  key: "NH",
                },
                {
                  label: "New Jersey",
                  value: "New Jersey",

                  key: "NJ",
                },
                {
                  label: "New Mexico",
                  value: "New Mexico",

                  key: "NM",
                },
                {
                  label: "New York",
                  value: "New York",

                  key: "NY",
                },
                {
                  label: "North Carolina",
                  value: "North Carolina",

                  key: "NC",
                },
                {
                  label: "North Dakota",
                  value: "North Dakota",

                  key: "ND",
                },
                {
                  label: "Northern Mariana Islands",
                  value: "Northern Mariana Islands",

                  key: "MP",
                },
                {
                  label: "Ohio",
                  value: "Ohio",

                  key: "OH",
                },
                {
                  label: "Oklahoma",
                  value: "Oklahoma",

                  key: "OK",
                },
                {
                  label: "Oregon",
                  value: "Oregon",

                  key: "OR",
                },
                {
                  label: "Palau",
                  value: "Palau",

                  key: "PW",
                },
                {
                  label: "Pennsylvania",
                  value: "Pennsylvania",

                  key: "PA",
                },
                {
                  label: "Puerto Rico",
                  value: "Puerto Rico",

                  key: "PR",
                },
                {
                  label: "Rhode Island",
                  value: "Rhode Island",

                  key: "RI",
                },
                {
                  label: "South Carolina",
                  value: "South Carolina",

                  key: "SC",
                },
                {
                  label: "South Dakota",
                  value: "South Dakota",

                  key: "SD",
                },
                {
                  label: "Tennessee",
                  value: "Tennessee",

                  key: "TN",
                },
                {
                  label: "Texas",
                  value: "Texas",

                  key: "TX",
                },
                {
                  label: "Utah",
                  value: "Utah",

                  key: "UT",
                },
                {
                  label: "Vermont",
                  value: "Vermont",

                  key: "VT",
                },
                {
                  label: "Virgin Islands",
                  value: "Virgin Islands",

                  key: "VI",
                },
                {
                  label: "Virginia",
                  value: "Virginia",

                  key: "VA",
                },
                {
                  label: "Washington",
                  value: "Washington",

                  key: "WA",
                },
                {
                  label: "West Virginia",
                  value: "West Virginia",

                  key: "WV",
                },
                {
                  label: "Wisconsin",
                  value: "Wisconsin",

                  key: "WI",
                },
                {
                  label: "Wyoming",
                  value: "Wyoming",

                  key: "WY",
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
});
