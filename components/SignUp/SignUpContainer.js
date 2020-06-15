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
    this.state = { signingUp: false };
  }

  signUp = async (
    type,
    phoneNumber,
    businessName,
    password,
    address,
    zipCode,
    username,
    city,
    state
  ) => {
    if (type) {
    } else {
      let userObj = {};
      this.setState({ signingUp: true });
      //create user
      // TODO add user username to create account
      try {
        let { data } = await Axios.post(
          "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nextup-ssnrm/service/addQueueManager/incoming_webhook/webhook0",
          {
            phoneNumber: phoneNumber,
            password: password,
            username: username.toLocaleLowerCase(),
          }
        );
        userObj = { ...data };
      } catch (e) {
        alert("Server Error");
        return;
      }
      let userId = userObj.id["$numberLong"];
      //create queue
      // TODO add phonenumber to creating queue
      try {
        await Axios.post(
          "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nextup-ssnrm/service/addQueue/incoming_webhook/webhook0",
          {
            businessName: businessName,
            id: userId,
            address: address,
            zipCode: zipCode,
            city: city,
            state: state,
            businessNumber: phoneNumber,
          }
        );
        setTimeout(() => {
          this.setState({ signingUp: false });
          this.props.toggleLogIn(username, password);
        }, 1000);
      } catch (e) {
        alert("Server Error");
        this.setState({ signingUp: false });
        return;
      }

      //sign user in
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
      if (this.state.signingUp) {
        return <></>;
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
}

export default SignUpContainer;

const styles = StyleSheet.create({
  signUpContainer: {
    borderColor: "#eeee",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 9,
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
