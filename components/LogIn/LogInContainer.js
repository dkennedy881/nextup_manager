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
} from "react-native";

//comps
import LogInQueueMember from "./LogInQueueMember";
import LogInQueueManager from "./LogInQueueManager";

class LogInContainer extends Component {
  logIn = (phoneNumber, password) => {
    const { toggleLogIn } = this.props;
    toggleLogIn(phoneNumber, password);
  };

  render() {
    let { queueMember, toggleLogInSignUp } = this.props;
    if (queueMember) {
      return (
        <View style={styles.logInContainer}>
          <Image
            style={{ width: 150, height: 40 }}
            source={require("../../images/next-up_text-color.jpeg")}
          />
          <LogInQueueMember
            logIn={this.logIn}
            toggleLogInSignUp={toggleLogInSignUp}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.logInContainer}>
          <LogInQueueManager
            logIn={this.logIn}
            toggleLogInSignUp={toggleLogInSignUp}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  logInContainer: {
    borderColor: "#eeee",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 30,
    alignSelf: "stretch",
    overflow: "hidden",
  },
});

export default LogInContainer;
