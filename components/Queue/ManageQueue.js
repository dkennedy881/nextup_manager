import React, { useState, Component } from "react";

//comps
import Counter from "./Counter";
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
    //update the app.js state
    await updateUserQueue(queueData);
    return;
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let { queueData, showSettings } = nextProps;

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
          <ScrollView style={styles.ManageQueueContainer}>
            <View>
              <Text style={styles.titleText}>{queueData.title}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Counter
                  count={queueData.count}
                  updateQueueCount={updateQueueCount}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  marginTop: 50,
                }}
              >
                <QueueMeta
                  editing={false}
                  queueData={queueData}
                  userObj={userObj}
                  updateQueueMeta={updateQueueMeta}
                />
              </View>
            </View>
          </ScrollView>
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
    height: "150%",
    flex: 1,
    paddingTop: 50,
    // alignItems: "center",
    backgroundColor: "#f5f5f5",
    // backgroundColor: `${selectedQueue ? "#9191" : "#f5f5f5"}`,
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
