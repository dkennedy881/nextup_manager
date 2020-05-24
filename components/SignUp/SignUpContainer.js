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
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import Axios from "axios";

//comps
import SignUpQueueMember from "./SignUpQueueMember";
import SignUpQueueManager from "./SignUpQueueManager";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  signUp = async (
    type,
    phoneNumber,
    businessName,
    password,
    address,
    zipCode
  ) => {
    if (type) {
    } else {
      let userObj = {};
      //create user
      try {
        let { data } = await Axios.post(
          "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nextup-ssnrm/service/addQueueManager/incoming_webhook/webhook0",
          {
            phoneNumber: phoneNumber,
            password: password,
          }
        );
        userObj = { ...data };
      } catch (e) {
        alert("Server Error");
        return;
      }
      let userId = userObj.id["$numberLong"];
      //create queue
      try {
        await Axios.post(
          "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nextup-ssnrm/service/addQueue/incoming_webhook/webhook0",
          {
            businessName: businessName,
            id: userId,
            address: address,
            zipCode: zipCode,
          }
        );
      } catch (e) {
        alert("Server Error");
        return;
      }

      //sign user in
      this.props.toggleLogIn(phoneNumber, password);
      return;
    }
  };

  render() {
    let { queueMember, toggleLogInSignUp, toggleLogIn } = this.props;
    if (queueMember) {
      return (
        <View style={styles.signUpContainer}>
          <SignUpQueueMember
            signUp={this.signUp}
            toggleLogInSignUp={toggleLogInSignUp}
            queueMember={true}
          />
        </View>
      );
    } else {
      return (
        <KeyboardAvoidingView
          enabled
          style={{}}
          keyboardVerticalOffset={0}
          behavior="padding"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.signUpContainer}>
              <SignUpQueueManager
                signUp={this.signUp}
                toggleLogInSignUp={toggleLogInSignUp}
                queueMember={false}
                toggleLogIn={toggleLogIn}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
    }
  }
}

export default SignUpContainer;

const styles = StyleSheet.create({
  signUpContainer: {
    borderColor: "#eeee",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 30,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  signUpFieldTextContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  signUpTitleText: {
    fontSize: 25,
  },
  signUpFieldText: {
    fontSize: 15,
  },
});
