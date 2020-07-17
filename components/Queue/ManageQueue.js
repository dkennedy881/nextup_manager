import React, { useState, Component } from "react";

//comps
import QueueMeta from "./QueueMeta";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  ListItem,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

class ManageQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSet: false,
      queueData: false,
      showSettings: false,
    };
  }

  updateQueueCount = async (count) => {
    Keyboard.dismiss();

    let { updateUserQueue } = this.props;
    let { queueData } = this.state;

    queueData.count = count;

    updateUserQueue(queueData);
  };

  updateQueueMeta = async (queueData) => {
    let { updateUserQueue } = this.props;
    let { queueData: withCount } = this.state;
    queueData.count = withCount.count;

    //update the app.js state
    await updateUserQueue(queueData);
    return;
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let { queueData, showSettings } = nextProps;
    // alert(queueData.active);
    if (queueData) {
      return {
        queueData,
        showSettings,
        isSet: true,
      };
    } else {
      return null;
    }
  }

  render() {
    let { isSet, queueData, showSettings } = this.state;
    let { updateQueueCount, updateQueueMeta } = this;
    let { userObj } = this.props;
    if (isSet) {
      if (showSettings) {
        return (
          <QueueMeta
            updateQueueMeta={updateQueueMeta}
            editing={true}
            queueData={queueData}
            userObj={userObj}
          />
        );
      } else {
        return (
          // <KeyboardAvoidingView
          //   style={{
          //     flex: 1,
          //     flexDirection: "column",
          //     justifyContent: "center",
          //   }}
          //   behavior="padding"
          //   enabled
          // >
          //   <ScrollView style={styles.ManageQueueContainer}>
          //     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          //       <View>
          //         <Text style={styles.titleText}>{queueData.title}</Text>
          //         <View
          //           style={{
          //             display: "flex",
          //             flexDirection: "row",
          //             justifyContent: "center",
          //           }}
          //         >
          //           <Counter
          //             count={queueData.count}
          //             updateQueueCount={updateQueueCount}
          //           />
          //         </View>
          //         <View
          //           style={{
          //             display: "flex",
          //             marginTop: 50,
          //             paddingBottom: 100,
          //           }}
          //         >
          //           <QueueMeta
          //             editing={false}
          //             queueData={queueData}
          //             userObj={userObj}
          //             updateQueueMeta={updateQueueMeta}
          //           />
          //         </View>
          //       </View>
          //     </TouchableWithoutFeedback>
          //   </ScrollView>
          // </KeyboardAvoidingView>
          <QueueMeta
            editing={false}
            queueData={queueData}
            userObj={userObj}
            updateQueueMeta={updateQueueMeta}
            count={queueData.count}
            updateQueueCount={updateQueueCount}
          />
        );
      }
    } else {
      return (
        <View style={styles.ManageQueueContainer}>
          <Text>Loading...</Text>
        </View>
      );
    }
  }
}

export default ManageQueue;

const styles = StyleSheet.create({
  ManageQueueContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
  },
  titleText: {
    fontWeight: "200",
    marginBottom: 10,
    fontSize: 35,
    color: "#121212",
    textAlign: "center",
  },
});

/*

  Todo need to include an 'updating state'


*/
