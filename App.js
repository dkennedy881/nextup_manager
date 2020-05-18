import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Axios from "axios";

//comps
import HeaderContainer from "./components/Header/HeaderContainer";
import ManageQueue from "./components/Queue/ManageQueue";
//containers
import SignUpContainer from "./components/SignUp/SignUpContainer";
import LogInContainer from "./components/LogIn/LogInContainer";

export default class App extends Component {
  state = {
    isLoggedIn: false,
    isSignedUp: true,
    userObj: false,
    queueData: false,
    showSettings: false,
  };

  toggleSettings = () => {
    this.setState({ showSettings: !this.state.showSettings });
  };

  toggleLogIn = async (phoneNumber, password) => {
    let { isLoggedIn, userObj, queueData } = this.state;

    if (isLoggedIn) {
      await this.setState((state) => ({
        ...state,
        userObj: false,
        queueData: false,
        isLoggedIn: !isLoggedIn,
      }));
    } else {
      //1. use params for log in
      try {
        userObj = await this.logIn(phoneNumber, password);
      } catch (e) {
        alert("User Not Found");
        return;
      }

      await this.setState((state) => ({
        ...state,
        userObj,
        isLoggedIn: !isLoggedIn,
      }));

      try {
        queueData = await this.getQueueData(userObj.id);
      } catch (e) {
        alert("No User Queue Found");
        return;
      }

      await this.setState((state) => ({
        ...state,
        queueData,
      }));
    }
  };

  logIn = async (phoneNumber, password) => {
    let {
      data,
    } = await Axios.post(
      "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nextup-ssnrm/service/addQueueManager/incoming_webhook/webhook0",
      { phoneNumber: phoneNumber, password: password }
    );

    alert(JSON.stringify(data));
    return;
    //temp
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          businessNumber: "2543193688",
          password: "1234",
          id: 8,
        });
      }, 100);
    });
  };

  getQueueData = async (id) => {
    //temp
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          title: "Some business",
          message: "this is the message",
          hours: {
            open: "9:00 am",
            close: "5:00 pm",
          },
          count: 0,
          active: true,
        });
      }, 500);
    });
  };

  updateUserQueue = async ({ title, message, hours, count, active }) => {
    //temp
    return new Promise(async (res, rej) => {
      setTimeout(() => {
        res({
          title,
          message,
          hours: hours,
          count,
          active,
        });
      }, 100);
      await this.setState({
        queueData: {
          title,
          message,
          hours: hours,
          count,
          active,
        },
      });
    });
  };

  toggleLogInSignUp = () => {
    this.setState({ isSignedUp: !this.state.isSignedUp });
  };

  render() {
    let {
      isLoggedIn,
      isSignedUp,
      queueMember,
      queueData,
      showSettings,
    } = this.state;
    let {
      toggleLogIn,
      toggleLogInSignUp,
      toggleSettings,
      updateUserQueue,
    } = this;

    if (isLoggedIn)
      return (
        <View style={styles.loggedInContainer}>
          <HeaderContainer
            queueMember={false}
            toggleLogIn={toggleLogIn}
            queueData={queueData}
            toggleSettings={toggleSettings}
          ></HeaderContainer>
          <ManageQueue
            showSettings={showSettings}
            queueData={queueData}
            updateUserQueue={updateUserQueue}
          ></ManageQueue>
        </View>
      );
    else
      return (
        <DisplayLogInSignUp
          isSignedUp={isSignedUp}
          toggleLogIn={toggleLogIn}
          toggleLogInSignUp={toggleLogInSignUp}
        ></DisplayLogInSignUp>
      );
  }
}

function DisplayLogInSignUp({ isSignedUp, toggleLogIn, toggleLogInSignUp }) {
  return (
    <View style={styles.loginSignUpContainer}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Image
          style={{
            height: 100,
            flex: 1,
            alignSelf: "stretch",
          }}
          source={require("./images/next-up_text-color.jpeg")}
        />
      </View>
      {isSignedUp ? (
        <LogInContainer
          queueMember={false}
          toggleLogIn={toggleLogIn}
          toggleLogInSignUp={toggleLogInSignUp}
        />
      ) : (
        <SignUpContainer></SignUpContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loginSignUpContainer: {
    margin: 20,
    alignContent: "center",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loggedInContainer: {
    flex: 1,
  },
});
