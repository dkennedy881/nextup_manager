import React, { Component, useState } from "react";
import { Icon } from "react-native-elements";

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
} from "react-native";

const confirmFunct = () => {
  return confirm("Are you sure you want to log out ?");
};
function HeaderContainer({ queueMember, toggleSettings, toggleLogIn }) {
  const [showSettings, setShowSettings] = useState(false);

  const logOutConfirm = function () {
    if (confirmFunct()) {
      toggleLogIn();
    }
  };

  function doToggleSettings() {
    toggleSettings();
    setShowSettings(!showSettings);
  }

  if (queueMember) {
    return (
      <View elevation={5} style={styles.HeaderContainer}>
        <View style={styles.HeaderItems}>
          <TouchableOpacity style={styles.HeaderItemSM}>
            {/* <Image style={{width: 150, height: 40,left:5}} source={require('../../images/next-up_text-color.jpeg')} /> */}
          </TouchableOpacity>
          <View style={styles.TitleContainer}>
            {/* <Text style={styles.TitleText}>Next Up</Text> */}
            <Image
              style={{ width: 150, height: 40 }}
              source={require("../../images/next-up_text-color.jpeg")}
            />
          </View>
          <TouchableOpacity style={styles.HeaderItemSM} />
        </View>
      </View>
    );
  } else {
    return (
      <View elevation={5} style={styles.HeaderContainer}>
        <View style={styles.HeaderItems}>
          <TouchableOpacity
            style={styles.HeaderItemSM}
            onPress={() => toggleLogIn()}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                top: 18,
                left: 10,
              }}
            >
              <Text style={{ color: "#6da8bd" }}>Logout</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.TitleContainer}>
            <Image
              style={{ width: 150, height: 40 }}
              source={require("../../images/next-up_text-color.jpeg")}
            />
          </View>
          <TouchableOpacity
            style={styles.HeaderItemSM}
            onPress={() => doToggleSettings()}
          >
            <View style={{ left: 25, top: 12 }}>
              <Icon
                name={showSettings ? "home" : "gear"}
                type="font-awesome"
                color="#6da8bd"
                size={30}
              />
            </View>

            {/* <Text style={styles.SettingsBtnText}>
              {showSettings ? "Home" : "Settings"}
            </Text> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  HeaderContainer: {
    height: "11%",
    flexDirection: "column-reverse",
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  HeaderItems: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "50%",
  },
  HeaderItemSM: {
    flex: 1,
    textAlign: "center",
    flexDirection: "column-reverse",
    // paddingBottom:10
  },
  LogoBtnText: {
    textAlign: "center",
    fontSize: 15,
  },
  TitleContainer: {
    flex: 2,
    flexDirection: "column-reverse",
    position: "relative",
    marginTop: -15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  TitleText: {
    textAlign: "center",
    fontSize: 25,
  },
  SettingsBtnText: {
    textAlign: "center",
    fontSize: 15,
  },
};

export default HeaderContainer;
