import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

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

  storeLoginState = async () => {
    try {
      const jsonValue = JSON.stringify(this.state);
      await AsyncStorage.setItem("@loginState_key", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  getLoginState = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@loginState_key");
      return jsonValue ? jsonValue : null;
    } catch (e) {
      // error reading value
      return null;
    }
  };

  resetPassword = (username) => {
    console.log(username);
    return new Promise(async (res, rej) => {
      try {
        let { data } = await Axios.post(
          "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nextup-ssnrm/service/sendNewPassword/incoming_webhook/webhook0",
          {
            username: String(username).toLocaleLowerCase(),
          }
        );
        if (data) {
          res(data);
        } else {
          alert("User Not Found");
        }
      } catch (e) {
        console.log(e);
        alert("System Error");
      }
    });
  };

  toggleSettings = () => {
    this.setState({ showSettings: !this.state.showSettings });
  };

  toggleLogIn = async (username, password) => {
    let { isLoggedIn, userObj, queueData } = this.state;

    if (isLoggedIn) {
      await this.setState((state) => ({
        ...state,
        userObj: false,
        queueData: false,
        isLoggedIn: !isLoggedIn,
        isSignedUp: true,
        showSettings: false,
      }));
    } else {
      //1. use params for log in
      try {
        userObj = await this.logIn(username, password);
      } catch (e) {
        alert(e);
        return;
      }
      await this.setState((state) => ({
        ...state,
        userObj,
        isLoggedIn: !isLoggedIn,
      }));

      // TODO add username
      try {
        queueData = await this.getQueueData(userObj.id["$numberLong"]);
        let newJSON = {
          title: queueData.title,
          message: queueData.message,
          hours: {
            open: queueData.open,
            close: queueData.close,
          },
          active: queueData.active,
          count: queueData.count["$numberLong"],
          id: queueData.id["$numberLong"],
          address: queueData.address,
          zipCode: queueData.zipCode,
          city: queueData.city,
          state: queueData.state,
          mask: queueData.mask,
          sani: queueData.sani,
          maxCount: queueData.maxCount,
          businessNumber: queueData.businessNumber,
        };
        queueData = newJSON;
      } catch (e) {
        alert("No User Queue Found");
        return;
      }
      // return;
      await this.setState((state) => ({
        ...state,
        queueData,
      }));
    }
    this.storeLoginState();
  };

  // TODO use username instead of phonenumber
  logIn = (username, password) => {
    return new Promise(async (res, rej) => {
      try {
        let { data } = await Axios.post(
          "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nextup-ssnrm/service/logInQueueManager/incoming_webhook/webhook0",
          {
            username: String(username).toLocaleLowerCase(),
            password: String(password),
          }
        );
        if (data) {
          res(data);
        } else {
          rej("User Not Found");
        }
      } catch (e) {
        alert(e);
      }
    });
  };

  getQueueData = async (id) => {
    //temp
    return new Promise(async (res, rej) => {
      try {
        let { data } = await Axios.post(
          "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nextup-ssnrm/service/getUserQueue/incoming_webhook/webhook0",
          {
            id: parseInt(id),
          }
        );
        if (data) {
          res(data);
        } else {
          rej("User Not Found");
        }
      } catch (e) {
        alert(e);
      }
    });
  };

  // TODO add phonenumber
  updateUserQueue = ({
    title,
    message,
    hours,
    count,
    active,
    id,
    address,
    zipCode,
    city,
    state,
    mask,
    sani,
    maxCount,
    businessNumber,
  }) => {
    return new Promise(async (res, rej) => {
      // TODO add phonenumber
      try {
        let { data: queueData } = await Axios.post(
          "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/nextup-ssnrm/service/updateUserQueue/incoming_webhook/webhook0",
          {
            title: title,
            message: message,
            open: hours.open,
            close: hours.close,
            count: parseInt(count),
            active: active,
            id: parseInt(id),
            address: address,
            zipCode: zipCode,
            city: city,
            state: state,
            mask: mask,
            sani: sani,
            maxCount: parseInt(maxCount),
            businessNumber: businessNumber,
          }
        );
        let newJSON = {
          title: queueData.title,
          message: queueData.message,
          hours: {
            open: queueData.open,
            close: queueData.close,
          },
          active: queueData.active,
          count: queueData.count["$numberLong"],
          id: queueData.id["$numberLong"],
          address: queueData.address,
          zipCode: queueData.zipCode,
          city: city,
          state: state,
          mask: mask,
          sani: sani,
          maxCount: maxCount,
          businessNumber: businessNumber,
        };
        queueData = newJSON;

        await this.setState({
          queueData: queueData,
        });
        res(queueData);
      } catch (e) {
        alert(e);
      }
    });
  };

  toggleLogInSignUp = () => {
    this.setState({ isSignedUp: !this.state.isSignedUp });
  };

  async componentDidMount() {
    let oldState = await this.getLoginState();
    if (oldState) {
      oldState = JSON.parse(oldState);
      this.setState(oldState);
    }
  }

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
      resetPassword,
    } = this;

    if (isLoggedIn)
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loggedInContainer}>
            <HeaderContainer
              queueMember={false}
              toggleLogIn={toggleLogIn}
              toggleSettings={toggleSettings}
            ></HeaderContainer>
            <ManageQueue
              showSettings={showSettings}
              queueData={queueData}
              updateUserQueue={updateUserQueue}
            ></ManageQueue>
          </View>
        </TouchableWithoutFeedback>
      );
    else
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <DisplayLogInSignUp
            isSignedUp={isSignedUp}
            toggleLogIn={toggleLogIn}
            toggleLogInSignUp={toggleLogInSignUp}
            resetPassword={resetPassword}
          ></DisplayLogInSignUp>
        </TouchableWithoutFeedback>
      );
  }
}

function DisplayLogInSignUp({
  isSignedUp,
  toggleLogIn,
  toggleLogInSignUp,
  resetPassword,
}) {
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
          resetPassword={resetPassword}
        />
      ) : (
        <SignUpContainer
          queueMember={false}
          toggleLogInSignUp={toggleLogInSignUp}
          toggleLogIn={toggleLogIn}
        ></SignUpContainer>
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
    display: "flex",
  },
});
