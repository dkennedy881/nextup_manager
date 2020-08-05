import React, { useState, useEffect, Component } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import { CheckBox } from "react-native-elements";
import Counter from "./Counter";
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
  TextInput,
  DatePickerIOS,
  TimePickerIOS,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";

function QueueMeta({
  queueData,
  userObj,
  editing,
  updateQueueMeta,
  updateQueueCount,
}) {
  const [title, setTitle] = useState(queueData.title);
  const [message, setMessage] = useState(queueData.message);
  const [city, setCity] = useState(queueData.city);
  const [state, setState] = useState(queueData.state);
  const [id, setId] = useState(queueData.id);
  const [count, setCount] = useState(queueData.count);
  const [active, setactive] = useState(queueData.active);
  const [mask, setMask] = useState(queueData.mask);
  const [sani, setSani] = useState(queueData.sani);
  const [maxCount, setMaxCount] = useState(
    typeof queueData.maxCount === "object"
      ? queueData.maxCount["$numberLong"]
      : queueData.maxCount
  );
  const [businessNumber, setBusinessNumber] = useState(
    queueData.businessNumber
  );
  const [address, setAddress] = useState(queueData.address);
  const [zipCode, setZipCode] = useState(queueData.zipCode);
  const [showSaving, setShowSaving] = useState(false);

  const [monday, setMonday] = useState(queueData.monday);
  const [tuesday, setTuesday] = useState(queueData.tuesday);
  const [wednesday, setWednesday] = useState(queueData.wednesday);
  const [thursday, setThursday] = useState(queueData.thursday);
  const [friday, setFriday] = useState(queueData.friday);
  const [saturday, setSaturday] = useState(queueData.saturday);
  const [sunday, setSunday] = useState(queueData.sunday);

  const [showTimeMonday, setShowTimeMonday] = useState(false);
  const [showTimeCloseMonday, setShowTimeCloseMonday] = useState(false);

  const [showTimeTuesday, setShowTimeTuesday] = useState(false);
  const [showTimeCloseTuesday, setShowTimeCloseTuesday] = useState(false);

  const [showTimeWednesday, setShowTimeWednesday] = useState(false);
  const [showTimeCloseWednesday, setShowTimeCloseWednesday] = useState(false);

  const [showTimeThursday, setShowTimeThursday] = useState(false);
  const [showTimeCloseThursday, setShowTimeCloseThursday] = useState(false);

  const [showTimeFriday, setShowTimeFriday] = useState(false);
  const [showTimeCloseFriday, setShowTimeCloseFriday] = useState(false);

  const [showTimeSaturday, setShowTimeSaturday] = useState(false);
  const [showTimeCloseSaturday, setShowTimeCloseSaturday] = useState(false);

  const [showTimeSunday, setShowTimeSunday] = useState(false);
  const [showTimeCloseSunday, setShowTimeCloseSunday] = useState(false);

  const [showTime, setShowTime] = useState(false);
  const [showTimeClose, setShowTimeClose] = useState(false);

  const [og, setOG] = useState({
    title,
    message,
    city,
    state,
    active,
    mask,
    sani,
    maxCount,
    businessNumber,
    address,
    zipCode,
    monday: monday,
    tuesday: tuesday,
    wednesday: wednesday,
    thursday: thursday,
    friday: friday,
    saturday: saturday,
    sunday: sunday,
  });

  const preSetState = (val) => {
    if (val) {
      const city = val.split(",")[0].trim();
      const state = val.split(",")[1].trim();
      setState(state);
      setCity(city);
    }
  };

  const checkDirty = () => {
    const newObj = {
      title,
      message,
      city,
      state,
      active,
      mask,
      sani,
      maxCount,
      businessNumber,
      address,
      zipCode,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday,
    };

    let isDirty = false;
    Reflect.ownKeys(og).forEach((k) => {
      if (typeof og[k] !== "object") {
        if (og[k] !== newObj[k]) {
          isDirty = true;
        }
      } else {
        Reflect.ownKeys(og[k]).forEach((kNested) => {
          if (og[k][kNested] !== newObj[k][kNested]) {
            isDirty = true;
          }
        });
      }
    });
    return isDirty;
  };

  const timeConvertor = (time) => {
    var PM = time.match("PM") ? true : false;

    time = time.split(":");
    var min = time[1];

    if (PM) {
      var hour = 12 + parseInt(time[0], 10);
      var sec = time[2].replace("PM", "");
    } else {
      var hour = time[0];
    }

    return new Date(2011, 0, 0, hour, min, 0, 0);
    // return new Date(`2015-03-25T${hour}:${min}:00`);
  };

  async function update() {
    setShowSaving(true);
    Keyboard.dismiss();

    await updateQueueMeta({
      id,
      title,
      message,
      count,
      active,
      address,
      zipCode,
      city,
      state,
      mask,
      sani,
      maxCount,
      businessNumber,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    });
    // setTimeout(() => {
    setOG({
      title,
      message,
      city,
      state,
      active,
      mask,
      sani,
      maxCount,
      businessNumber,
      address,
      zipCode,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday,
    });

    setShowSaving(false);
    // }, 15=00);
  }

  const setOpen = (value, type) => {
    switch (type) {
      case "monday":
        setMonday({ ...monday, open: value });
        break;
      case "tuesday":
        setTuesday({ ...tuesday, open: value });
        break;
      case "wednesday":
        setWednesday({ ...wednesday, open: value });
        break;
      case "thursday":
        setThursday({ ...thursday, open: value });
        break;
      case "friday":
        setFriday({ ...friday, open: value });
        break;
      case "saturday":
        setSaturday({ ...saturday, open: value });
        break;
      default:
        setSunday({ ...sunday, open: value });
    }
  };
  const setClose = (value, type) => {
    switch (type) {
      case "monday":
        setMonday({ ...monday, close: value });
        break;
      case "tuesday":
        setTuesday({ ...tuesday, close: value });
        break;
      case "wednesday":
        setWednesday({ ...wednesday, close: value });
        break;
      case "thursday":
        setThursday({ ...thursday, close: value });
        break;
      case "friday":
        setFriday({ ...friday, close: value });
        break;
      case "saturday":
        setSaturday({ ...saturday, close: value });
        break;
      default:
        setSunday({ ...sunday, close: value });
    }
  };

  const setChecked = (type) => {
    switch (type) {
      case "monday":
        setMonday({ ...monday, active: !monday.active });
        break;
      case "tuesday":
        setTuesday({ ...tuesday, active: !tuesday.active });
        break;
      case "wednesday":
        setWednesday({ ...wednesday, active: !wednesday.active });
        break;
      case "thursday":
        setThursday({ ...thursday, active: !thursday.active });
        break;
      case "friday":
        setFriday({ ...friday, active: !friday.active });
        break;
      case "saturday":
        setSaturday({ ...saturday, active: !saturday.active });
        break;
      default:
        setSunday({ ...sunday, active: !sunday.active });
    }
  };

  if (editing) {
    return (
      <KeyboardAvoidingView
        enabled
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
        behavior="padding"
      >
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.MetaContainerEditing}>
              <Text style={styles.titleText}>Covid - 19 Information</Text>
              <View style={styles.MetaRowEditingFlex}>
                <View style={styles.MetaTitleTextView}>
                  <Text style={styles.MetaTitleText}>Masks Required?</Text>
                </View>
                <View style={styles.inputFieldBtn}>
                  <RNPickerSelect
                    textStyle={{ color: "#5cb85c" }}
                    style={{ ...pickerSelectStyles }}
                    onValueChange={(value) => setMask(value)}
                    value={mask}
                    items={[
                      {
                        label: "Yes",
                        value: true,

                        key: "true",
                      },
                      {
                        label: "No",
                        value: false,

                        key: "false",
                      },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.MetaRowEditingFlex}>
                <View style={styles.MetaTitleTextView}>
                  <Text style={styles.MetaTitleText}>Sanitizer Available?</Text>
                </View>
                <View style={styles.inputFieldBtn}>
                  <RNPickerSelect
                    // style={{ color: "red", fontWeight: "900" }}
                    onValueChange={(value) => setSani(value)}
                    value={sani}
                    textStyle={{ color: "#5cb85c" }}
                    style={{ ...pickerSelectStyles }}
                    inputIOS
                    items={[
                      {
                        label: "Yes",
                        value: true,

                        key: "true1",
                      },
                      {
                        label: "No",
                        value: false,

                        key: "false1",
                      },
                    ]}
                  />
                </View>
              </View>

              <View
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  padding: 50,
                  paddingBottom: 0,
                  paddingTop: 0,
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "row",
                  height: 80,
                }}
              >
                <View style={styles.MetaTitleTextView}>
                  <Text style={styles.MetaTitleText}>Maximum Capacity</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    padding: 20,
                    paddingTop: 15,
                    borderRadius: 9,
                    height: 50,
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "flex-end",
                    position: "relative",
                    left: 20,
                  }}
                >
                  <TextInput
                    style={styles.MetaDataTextInputFlex}
                    value={maxCount}
                    keyboardType="numeric"
                    onChangeText={(value) => setMaxCount(value)}
                  ></TextInput>
                </View>
              </View>
              <Text style={styles.titleText}>Business Details</Text>
              <View style={styles.MetaRowEditing}>
                <Text style={styles.MetaTitleText}>Update Business Status</Text>
                <Text style={styles.MetaTitleTextSM}>
                  keep your prospective customers informed
                </Text>
                <TextInput
                  style={styles.MetaDataParagraphInput}
                  defaultValue={message}
                  multiline
                  numberOfLines={4}
                  onChangeText={(value) => setMessage(value)}
                ></TextInput>
              </View>
              <View style={styles.MetaRowEditing}>
                <Text style={styles.MetaTitleText}>Business Name</Text>
                <Text style={styles.MetaTitleTextSM}>
                  The name customers will see when using the app.
                </Text>
                <TextInput
                  style={styles.MetaDataTextInput}
                  defaultValue={title}
                  onChangeText={(value) => setTitle(value)}
                ></TextInput>
              </View>
              <View style={styles.MetaRowEditing}>
                <Text style={styles.MetaTitleText}>Business Phone Number</Text>
                <TextInput
                  style={styles.MetaDataTextInput}
                  defaultValue={businessNumber}
                  onChangeText={(value) => setBusinessNumber(value)}
                ></TextInput>
              </View>

              <View
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  padding: 50,
                  paddingRight: 0,
                  paddingBottom: 0,
                  paddingTop: 10,
                  backgroundColor: "white",
                  display: "flex",
                }}
              >
                <Text style={styles.MetaTitleText}>Hours of Operation</Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowTime(true);
                  }}
                >
                  <Text
                    style={{
                      color: "#6da8bd",
                      fontWeight: "400",
                      marginTop: 5,
                    }}
                  >
                    Update All Open Hours
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={showTime}
                  mode="time"
                  headerTextIOS="What time does your business open?"
                  date={timeConvertor("9:00 AM".replace(/\s/g, ":00"))}
                  onConfirm={(value) => {
                    const newTime = new Date(value)
                      .toLocaleTimeString("en-US")
                      .replace(/:\d{2}\s/g, " ");
                    setOpen(newTime, "monday");
                    setOpen(newTime, "tuesday");
                    setOpen(newTime, "wednesday");
                    setOpen(newTime, "thursday");
                    setOpen(newTime, "friday");
                    setOpen(newTime, "saturday");
                    setOpen(newTime, "sunday");
                    setShowTime(!showTime);
                  }}
                  onCancel={(value) => {
                    setShowTime(!showTime);
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setShowTimeClose(true);
                  }}
                >
                  <Text
                    style={{
                      color: "#6da8bd",
                      fontWeight: "400",
                      marginTop: 5,
                    }}
                  >
                    Update All Close Hours
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={showTimeClose}
                  mode="time"
                  headerTextIOS="What time does your business close?"
                  date={timeConvertor("5:00 PM".replace(/\s/g, ":00"))}
                  onConfirm={(value) => {
                    const newTime = new Date(value)
                      .toLocaleTimeString("en-US")
                      .replace(/:\d{2}\s/g, " ");
                    setClose(newTime, "monday");
                    setClose(newTime, "tuesday");
                    setClose(newTime, "wednesday");
                    setClose(newTime, "thursday");
                    setClose(newTime, "friday");
                    setClose(newTime, "saturday");
                    setClose(newTime, "sunday");
                    setShowTimeClose(!showTimeClose);
                  }}
                  onCancel={(value) => {
                    setShowTimeClose(!showTimeClose);
                  }}
                />
                <View
                  style={{
                    padding: 2,
                    paddingTop: 0,
                    paddingBottom: 0,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View style={styles.MetaTitleTextViewDays}>
                    <Text style={styles.MetaTitleTextSM}>Monday</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      padding: 20,
                      paddingTop: 15,
                      borderRadius: 9,
                      height: 90,
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      Open -{" "}
                      <Text
                        onPress={() => {
                          setShowTimeMonday(!showTimeMonday);
                        }}
                        style={{ color: "#6da8bd", fontWeight: "800" }}
                      >
                        {monday.open}
                      </Text>
                    </Text>
                    <DateTimePickerModal
                      isVisible={showTimeMonday}
                      mode="time"
                      headerTextIOS="What time does your business open on Monday?"
                      date={timeConvertor(monday.open.replace(/\s/g, ":00"))}
                      onConfirm={(value) => {
                        setOpen(
                          new Date(value)
                            .toLocaleTimeString("en-US")
                            .replace(/:\d{2}\s/g, " "),
                          "monday"
                        );
                        setShowTimeMonday(!showTimeMonday);
                      }}
                      onCancel={(value) => {
                        setShowTimeMonday(!showTimeMonday);
                      }}
                    />
                    <Text style={{ textAlign: "right", marginTop: 10 }}>
                      Close -{" "}
                      <Text
                        onPress={() => {
                          setShowTimeCloseMonday(!showTimeCloseMonday);
                        }}
                        style={{ color: "#6da8bd", fontWeight: "800" }}
                      >
                        {monday.close}
                      </Text>
                    </Text>
                    <DateTimePickerModal
                      isVisible={showTimeCloseMonday}
                      mode="time"
                      headerTextIOS="What time does your business close on Monday?"
                      date={timeConvertor(monday.close.replace(/\s/g, ":00"))}
                      onConfirm={(value) => {
                        setClose(
                          new Date(value)
                            .toLocaleTimeString("en-US")
                            .replace(/:\d{2}\s/g, " "),
                          "monday"
                        );
                        setShowTimeCloseMonday(!showTimeCloseMonday);
                      }}
                      onCancel={(value) => {
                        setShowTimeCloseMonday(!showTimeCloseMonday);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      paddingTop: 15,
                      height: 90,
                      width: 120,
                      backgroundColor: "white",
                    }}
                  >
                    <CheckBox
                      containerStyle={{
                        backgroundColor: "white",
                        borderColor: "white",
                      }}
                      textStyle={{ color: "black", fontWeight: "300" }}
                      iconRight={true}
                      checkedColor={"#6da8bd"}
                      checked={monday.active}
                      onPress={() => setChecked("monday")}
                    />
                    {/* <Text style={{ color: "#6da8bd", fontWeight: "800" }}>
                      Clear Hours
                    </Text> */}
                  </View>
                </View>
                <View
                  style={{
                    padding: 2,
                    paddingTop: 0,
                    paddingBottom: 0,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View style={styles.MetaTitleTextViewDays}>
                    <Text style={styles.MetaTitleTextSM}>Tuesday</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      padding: 20,
                      paddingTop: 15,
                      borderRadius: 9,
                      height: 90,
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      Open -{" "}
                      <Text
                        onPress={() => {
                          setShowTimeTuesday(!showTimeTuesday);
                        }}
                        style={{ color: "#6da8bd", fontWeight: "800" }}
                      >
                        {tuesday.open}
                      </Text>
                    </Text>
                    <DateTimePickerModal
                      isVisible={showTimeTuesday}
                      mode="time"
                      headerTextIOS="What time does your business open on Tuesday?"
                      date={timeConvertor(tuesday.open.replace(/\s/g, ":00"))}
                      onConfirm={(value) => {
                        setOpen(
                          new Date(value)
                            .toLocaleTimeString("en-US")
                            .replace(/:\d{2}\s/g, " "),
                          "tuesday"
                        );
                        setShowTimeTuesday(!showTimeTuesday);
                      }}
                      onCancel={(value) => {
                        setShowTimeTuesday(!showTimeTuesday);
                      }}
                    />
                    <Text style={{ textAlign: "right", marginTop: 10 }}>
                      Close -{" "}
                      <Text
                        onPress={() => {
                          setShowTimeCloseTuesday(!showTimeCloseTuesday);
                        }}
                        style={{ color: "#6da8bd", fontWeight: "800" }}
                      >
                        {tuesday.close}
                      </Text>
                    </Text>
                    <DateTimePickerModal
                      isVisible={showTimeCloseTuesday}
                      mode="time"
                      headerTextIOS="What time does your business close on Tuesday?"
                      date={timeConvertor(tuesday.close.replace(/\s/g, ":00"))}
                      onConfirm={(value) => {
                        setClose(
                          new Date(value)
                            .toLocaleTimeString("en-US")
                            .replace(/:\d{2}\s/g, " "),
                          "tuesday"
                        );
                        setShowTimeCloseTuesday(!showTimeCloseTuesday);
                      }}
                      onCancel={(value) => {
                        setShowTimeCloseTuesday(!showTimeCloseTuesday);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      paddingTop: 15,
                      height: 90,
                      width: 120,
                      backgroundColor: "white",
                    }}
                  >
                    <CheckBox
                      containerStyle={{
                        backgroundColor: "white",
                        borderColor: "white",
                      }}
                      textStyle={{ color: "black", fontWeight: "300" }}
                      iconRight={true}
                      checkedColor={"#6da8bd"}
                      checked={tuesday.active}
                      onPress={() => setChecked("tuesday")}
                    />
                    {/* <Text style={{ color: "#6da8bd", fontWeight: "800" }}>
                      Clear Hours
                    </Text> */}
                  </View>
                </View>
                <View
                  style={{
                    padding: 2,
                    paddingTop: 0,
                    paddingBottom: 0,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View style={styles.MetaTitleTextViewDays}>
                    <Text style={styles.MetaTitleTextSM}>Wednesday</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      padding: 20,
                      paddingTop: 15,
                      borderRadius: 9,
                      height: 90,
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      Open -{" "}
                      <Text
                        onPress={() => {
                          setShowTimeWednesday(!showTimeWednesday);
                        }}
                        style={{ color: "#6da8bd", fontWeight: "800" }}
                      >
                        {wednesday.open}
                      </Text>
                    </Text>
                    <DateTimePickerModal
                      isVisible={showTimeWednesday}
                      mode="time"
                      headerTextIOS="What time does your business open on Wednesday?"
                      date={timeConvertor(wednesday.open.replace(/\s/g, ":00"))}
                      onConfirm={(value) => {
                        setOpen(
                          new Date(value)
                            .toLocaleTimeString("en-US")
                            .replace(/:\d{2}\s/g, " "),
                          "wednesday"
                        );
                        setShowTimeWednesday(!showTimeWednesday);
                      }}
                      onCancel={(value) => {
                        setShowTimeWednesday(!showTimeWednesday);
                      }}
                    />
                    <Text style={{ textAlign: "right", marginTop: 10 }}>
                      Close -{" "}
                      <Text
                        onPress={() => {
                          setShowTimeCloseWednesday(!showTimeCloseWednesday);
                        }}
                        style={{ color: "#6da8bd", fontWeight: "800" }}
                      >
                        {wednesday.close}
                      </Text>
                    </Text>
                    <DateTimePickerModal
                      isVisible={showTimeCloseWednesday}
                      mode="time"
                      headerTextIOS="What time does your business close on Wednesday?"
                      date={timeConvertor(
                        wednesday.close.replace(/\s/g, ":00")
                      )}
                      onConfirm={(value) => {
                        setClose(
                          new Date(value)
                            .toLocaleTimeString("en-US")
                            .replace(/:\d{2}\s/g, " "),
                          "wednesday"
                        );
                        setShowTimeCloseWednesday(!showTimeCloseWednesday);
                      }}
                      onCancel={(value) => {
                        setShowTimeCloseWednesday(!showTimeCloseWednesday);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      paddingTop: 15,
                      height: 90,
                      width: 120,
                      backgroundColor: "white",
                    }}
                  >
                    <CheckBox
                      containerStyle={{
                        backgroundColor: "white",
                        borderColor: "white",
                      }}
                      textStyle={{ color: "black", fontWeight: "300" }}
                      iconRight={true}
                      checkedColor={"#6da8bd"}
                      checked={wednesday.active}
                      onPress={() => setChecked("wednesday")}
                    />
                    {/* <Text style={{ color: "#6da8bd", fontWeight: "800" }}>
                      Clear Hours
                    </Text> */}
                  </View>
                </View>
                <View
                  style={{
                    padding: 2,
                    paddingTop: 0,
                    paddingBottom: 0,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View style={styles.MetaTitleTextViewDays}>
                    <Text style={styles.MetaTitleTextSM}>Thursday</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      padding: 20,
                      paddingTop: 15,
                      borderRadius: 9,
                      height: 90,
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      Open -{" "}
                      <Text
                        onPress={() => {
                          setShowTimeThursday(!showTimeThursday);
                        }}
                        style={{ color: "#6da8bd", fontWeight: "800" }}
                      >
                        {thursday.open}
                      </Text>
                    </Text>
                    <DateTimePickerModal
                      isVisible={showTimeThursday}
                      mode="time"
                      headerTextIOS="What time does your business open on Thursday?"
                      date={timeConvertor(thursday.open.replace(/\s/g, ":00"))}
                      onConfirm={(value) => {
                        setOpen(
                          new Date(value)
                            .toLocaleTimeString("en-US")
                            .replace(/:\d{2}\s/g, " "),
                          "thursday"
                        );
                        setShowTimeThursday(!showTimeThursday);
                      }}
                      onCancel={(value) => {
                        setShowTimeThursday(!showTimeThursday);
                      }}
                    />
                    <Text style={{ textAlign: "right", marginTop: 10 }}>
                      Close -{" "}
                      <Text
                        onPress={() => {
                          setShowTimeCloseThursday(!showTimeCloseThursday);
                        }}
                        style={{ color: "#6da8bd", fontWeight: "800" }}
                      >
                        {thursday.close}
                      </Text>
                    </Text>
                    <DateTimePickerModal
                      isVisible={showTimeCloseThursday}
                      mode="time"
                      headerTextIOS="What time does your business close on Thursday?"
                      date={timeConvertor(thursday.close.replace(/\s/g, ":00"))}
                      onConfirm={(value) => {
                        setClose(
                          new Date(value)
                            .toLocaleTimeString("en-US")
                            .replace(/:\d{2}\s/g, " "),
                          "thursday"
                        );
                        setShowTimeCloseThursday(!showTimeCloseThursday);
                      }}
                      onCancel={(value) => {
                        setShowTimeCloseThursday(!showTimeCloseThursday);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      paddingTop: 15,
                      height: 90,
                      width: 120,
                      backgroundColor: "white",
                    }}
                  >
                    <CheckBox
                      containerStyle={{
                        backgroundColor: "white",
                        borderColor: "white",
                      }}
                      textStyle={{ color: "black", fontWeight: "300" }}
                      iconRight={true}
                      checkedColor={"#6da8bd"}
                      checked={thursday.active}
                      onPress={() => setChecked("thursday")}
                    />
                    {/* <Text style={{ color: "#6da8bd", fontWeight: "800" }}>
                      Clear Hours
                    </Text> */}
                  </View>
                </View>
                <View
                  style={{
                    padding: 2,
                    paddingTop: 0,
                    paddingBottom: 0,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View style={styles.MetaTitleTextViewDays}>
                    <Text style={styles.MetaTitleTextSM}>Friday</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      padding: 20,
                      paddingTop: 15,
                      borderRadius: 9,
                      height: 90,
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      Open -{" "}
                      <Text
                        onPress={() => {
                          setShowTimeFriday(!showTimeFriday);
                        }}
                        style={{ color: "#6da8bd", fontWeight: "800" }}
                      >
                        {friday.open}
                      </Text>
                    </Text>
                    <DateTimePickerModal
                      isVisible={showTimeFriday}
                      mode="time"
                      headerTextIOS="What time does your business open Friday?"
                      date={timeConvertor(friday.open.replace(/\s/g, ":00"))}
                      onConfirm={(value) => {
                        setOpen(
                          new Date(value)
                            .toLocaleTimeString("en-US")
                            .replace(/:\d{2}\s/g, " "),
                          "friday"
                        );
                        setShowTimeFriday(!showTimeFriday);
                      }}
                      onCancel={(value) => {
                        setShowTimeFriday(!showTimeFriday);
                      }}
                    />
                    <Text style={{ textAlign: "right", marginTop: 10 }}>
                      Close -{" "}
                      <Text
                        onPress={() => {
                          setShowTimeCloseFriday(!showTimeCloseFriday);
                        }}
                        style={{ color: "#6da8bd", fontWeight: "800" }}
                      >
                        {friday.close}
                      </Text>
                    </Text>
                    <DateTimePickerModal
                      isVisible={showTimeCloseFriday}
                      mode="time"
                      headerTextIOS="What time does your business close on Friday?"
                      date={timeConvertor(friday.close.replace(/\s/g, ":00"))}
                      onConfirm={(value) => {
                        setClose(
                          new Date(value)
                            .toLocaleTimeString("en-US")
                            .replace(/:\d{2}\s/g, " "),
                          "friday"
                        );
                        setShowTimeCloseFriday(!showTimeCloseFriday);
                      }}
                      onCancel={(value) => {
                        setShowTimeCloseFriday(!showTimeCloseFriday);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      paddingTop: 15,
                      height: 90,
                      width: 120,
                      backgroundColor: "white",
                    }}
                  >
                    <CheckBox
                      containerStyle={{
                        backgroundColor: "white",
                        borderColor: "white",
                      }}
                      textStyle={{ color: "black", fontWeight: "300" }}
                      iconRight={true}
                      checkedColor={"#6da8bd"}
                      checked={friday.active}
                      onPress={() => setChecked("friday")}
                    />
                    {/* <Text style={{ color: "#6da8bd", fontWeight: "800" }}>
                      Clear Hours
                    </Text> */}
                  </View>
                </View>
                <View
                  style={{
                    padding: 2,
                    paddingTop: 0,
                    paddingBottom: 0,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View style={styles.MetaTitleTextViewDays}>
                    <Text style={styles.MetaTitleTextSM}>Saturday</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      padding: 20,
                      paddingTop: 15,
                      borderRadius: 9,
                      height: 90,
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      Open -{" "}
                      <Text
                        onPress={() => {
                          setShowTimeSaturday(!showTimeSaturday);
                        }}
                        style={{ color: "#6da8bd", fontWeight: "800" }}
                      >
                        {saturday.open}
                      </Text>
                    </Text>
                    <DateTimePickerModal
                      isVisible={showTimeSaturday}
                      mode="time"
                      headerTextIOS="What time does your business open Saturday?"
                      date={timeConvertor(saturday.open.replace(/\s/g, ":00"))}
                      onConfirm={(value) => {
                        setOpen(
                          new Date(value)
                            .toLocaleTimeString("en-US")
                            .replace(/:\d{2}\s/g, " "),
                          "saturday"
                        );
                        setShowTimeSaturday(!showTimeSaturday);
                      }}
                      onCancel={(value) => {
                        setShowTimeSaturday(!showTimeSaturday);
                      }}
                    />
                    <Text style={{ textAlign: "right", marginTop: 10 }}>
                      Close -{" "}
                      <Text
                        onPress={() => {
                          setShowTimeCloseSaturday(!showTimeCloseSaturday);
                        }}
                        style={{ color: "#6da8bd", fontWeight: "800" }}
                      >
                        {saturday.close}
                      </Text>
                    </Text>
                    <DateTimePickerModal
                      isVisible={showTimeCloseSaturday}
                      mode="time"
                      headerTextIOS="What time does your business close on Saturday?"
                      date={timeConvertor(saturday.close.replace(/\s/g, ":00"))}
                      onConfirm={(value) => {
                        setClose(
                          new Date(value)
                            .toLocaleTimeString("en-US")
                            .replace(/:\d{2}\s/g, " "),
                          "saturday"
                        );
                        setShowTimeCloseSaturday(!showTimeCloseSaturday);
                      }}
                      onCancel={(value) => {
                        setShowTimeCloseSaturday(!showTimeCloseSaturday);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      paddingTop: 15,
                      height: 90,
                      width: 120,
                      backgroundColor: "white",
                    }}
                  >
                    <CheckBox
                      containerStyle={{
                        backgroundColor: "white",
                        borderColor: "white",
                      }}
                      textStyle={{ color: "black", fontWeight: "300" }}
                      iconRight={true}
                      checkedColor={"#6da8bd"}
                      checked={saturday.active}
                      onPress={() => setChecked("saturday")}
                    />
                    {/* <Text style={{ color: "#6da8bd", fontWeight: "800" }}>
                      Clear Hours
                    </Text> */}
                  </View>
                </View>
                <View
                  style={{
                    padding: 2,
                    paddingTop: 0,
                    paddingBottom: 0,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View style={styles.MetaTitleTextViewDays}>
                    <Text style={styles.MetaTitleTextSM}>Sunday</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      padding: 20,
                      paddingTop: 15,
                      borderRadius: 9,
                      height: 90,
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>
                      Open -{" "}
                      <Text
                        onPress={() => {
                          setShowTimeSunday(!showTimeSunday);
                        }}
                        style={{ color: "#6da8bd", fontWeight: "800" }}
                      >
                        {sunday.open}
                      </Text>
                    </Text>
                    <DateTimePickerModal
                      isVisible={showTimeSunday}
                      mode="time"
                      headerTextIOS="What time does your business open Sunday?"
                      date={timeConvertor(sunday.open.replace(/\s/g, ":00"))}
                      onConfirm={(value) => {
                        setOpen(
                          new Date(value)
                            .toLocaleTimeString("en-US")
                            .replace(/:\d{2}\s/g, " "),
                          "sunday"
                        );
                        setShowTimeSunday(!showTimeSunday);
                      }}
                      onCancel={(value) => {
                        setShowTimeSunday(!showTimeSunday);
                      }}
                    />
                    <Text style={{ textAlign: "right", marginTop: 10 }}>
                      Close -{" "}
                      <Text
                        onPress={() => {
                          setShowTimeCloseSunday(!showTimeCloseSunday);
                        }}
                        style={{ color: "#6da8bd", fontWeight: "800" }}
                      >
                        {sunday.close}
                      </Text>
                    </Text>
                    <DateTimePickerModal
                      isVisible={showTimeCloseSunday}
                      mode="time"
                      headerTextIOS="What time does your business close on Sunday?"
                      date={timeConvertor(sunday.close.replace(/\s/g, ":00"))}
                      onConfirm={(value) => {
                        setClose(
                          new Date(value)
                            .toLocaleTimeString("en-US")
                            .replace(/:\d{2}\s/g, " "),
                          "sunday"
                        );
                        setShowTimeCloseSunday(!showTimeCloseSunday);
                      }}
                      onCancel={(value) => {
                        setShowTimeCloseSunday(!showTimeCloseSunday);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      paddingTop: 15,
                      height: 90,
                      width: 120,
                      backgroundColor: "white",
                    }}
                  >
                    <CheckBox
                      containerStyle={{
                        backgroundColor: "white",
                        borderColor: "white",
                      }}
                      textStyle={{ color: "black", fontWeight: "300" }}
                      iconRight={true}
                      checkedColor={"#6da8bd"}
                      checked={sunday.active}
                      onPress={() => setChecked("sunday")}
                    />
                    {/* <Text style={{ color: "#6da8bd", fontWeight: "800" }}>
                      Clear Hours
                    </Text> */}
                  </View>
                </View>
              </View>
              <View style={styles.MetaRowEditing}>
                <Text style={styles.MetaTitleText}>City</Text>
                <View style={styles.inputField}>
                  <RNPickerSelect
                    onValueChange={(value) => preSetState(value)}
                    value={`${city}, ${state}`}
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
              <View style={styles.MetaRowEditing}>
                <Text style={styles.MetaTitleText}>Address</Text>
                <TextInput
                  style={styles.MetaDataTextInput}
                  defaultValue={address}
                  onChangeText={(value) => setAddress(value)}
                ></TextInput>
              </View>

              <View style={styles.MetaRowEditing}>
                <Text style={styles.MetaTitleText}>Zip Code</Text>
                <TextInput
                  style={styles.MetaDataTextInput}
                  defaultValue={zipCode}
                  onChangeText={(value) => setZipCode(value)}
                ></TextInput>
              </View>
              <View
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  padding: 50,
                  paddingBottom: 0,
                  paddingTop: 0,
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "row",
                  height: 90,
                }}
              >
                <View style={styles.MetaTitleTextView}>
                  <Text style={styles.MetaTitleText}>Active</Text>
                  <View style={styles.MetaTitleTextSMFlex}>
                    <Text>
                      Determines if business visible to queue members.
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    padding: 20,
                    paddingTop: 15,
                    borderRadius: 9,
                    height: 90,
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "flex-end",
                    marginTop: 20,
                  }}
                >
                  <RNPickerSelect
                    textStyle={{ color: "#5cb85c" }}
                    style={{ ...pickerSelectStyles }}
                    onValueChange={(value) => setactive(value)}
                    value={active}
                    items={[
                      {
                        label: "Yes",
                        value: true,

                        key: "true44",
                      },
                      {
                        label: "No",
                        value: false,

                        key: "false44",
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            top: 0,
            backgroundColor: "white",
            width: "100%",
            flex: 1,
            height: 55,
            flexDirection: "row",
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
          }}
        >
          <View style={styles.ButtonRowNew1}>
            <View style={styles.ButtonRowNew}>
              {!checkDirty() ? (
                <TouchableOpacity
                  style={styles.SaveButtonNew}
                  onPress={() => update()}
                >
                  <Text style={styles.SaveButtonText}>Update</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.SaveButtonNew2}
                  onPress={() => update()}
                >
                  <Text style={styles.SaveButtonText}>Update</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <View
          style={{
            height: 60,
            flexDirection: "row",
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 15,
            backgroundColor: "white",
          }}
        >
          <View style={styles.ButtonRowNew}>
            {!checkDirty() ? (
              <TouchableOpacity
                style={styles.SaveButtonNew}
                onPress={() => update()}
              >
                <Text style={styles.SaveButtonText}>Update</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.SaveButtonNew2}
                onPress={() => update()}
              >
                <Text style={styles.SaveButtonText}>Update</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <KeyboardAvoidingView
          enabled
          style={{ flex: 1 }}
          keyboardVerticalOffset={100}
          behavior="padding"
        >
          <ScrollView>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.titleText}>{queueData.title}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Counter count={count} updateQueueCount={updateQueueCount} />
              </View>
            </View>
            <View style={styles.MetaRow}>
              <View style={{ paddingRight: 20, paddingLeft: 20 }}>
                <Text style={styles.MetaTitleText}>Business Message</Text>
                {/* <Text style={styles.MetaData}>{queueData.message}</Text> */}
                <TextInput
                  style={styles.MetaDataParagraphInput}
                  defaultValue={message}
                  multiline
                  numberOfLines={3}
                  onChangeText={(value) => setMessage(value)}
                ></TextInput>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                marginBottom: 5,
                padding: 30,
                paddingBottom: 0,
                paddingTop: 0,
                backgroundColor: "white",
                // height: 90,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: 90,
                }}
              >
                <View style={styles.MetaTitleTextView}>
                  <Text style={styles.MetaTitleText}>Active</Text>
                  <View style={styles.MetaTitleTextSMFlex}>
                    <Text>
                      Determines if business visible to queue members.
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    padding: 20,
                    paddingTop: 15,
                    borderRadius: 9,
                    height: 90,
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "flex-end",
                    marginTop: 20,
                  }}
                >
                  <RNPickerSelect
                    textStyle={{ color: "#5cb85c" }}
                    style={{ ...pickerSelectStyles }}
                    onValueChange={(value) => setactive(value)}
                    value={active}
                    items={[
                      {
                        label: "Yes",
                        value: true,

                        key: "true55",
                      },
                      {
                        label: "No",
                        value: false,

                        key: "false55",
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default QueueMeta;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: "#87c8e0",
    fontWeight: "800",
  },
});

const styles = StyleSheet.create({
  MetaContainer: {
    // paddingTop: 0,
    // // flex: 1,
    // // overflow: "scroll",
    // justifyContent: "flex-end",
    // marginBottom: 300,
    paddingTop: 10,
    // flex: 1,
    overflow: "scroll",
    justifyContent: "flex-end",
    backgroundColor: "#f5f5f5",
    paddingBottom: 100,
  },
  MetaContainerEditing: {
    paddingTop: 10,
    // flex: 1,
    overflow: "scroll",
    justifyContent: "flex-end",
    backgroundColor: "#f5f5f5",
    paddingBottom: 100,
    marginTop: 60,
  },
  MetaRow: {
    padding: 10,
    marginBottom: -10,
    marginTop: 10,
    backgroundColor: "white",
  },
  MetaRowEditing: {
    marginTop: 5,
    marginBottom: 5,
    padding: 50,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  MetaRowEditingFlex: {
    marginTop: 5,
    marginBottom: 5,
    padding: 50,
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
  },
  MetaRowEditingCenter: {
    marginTop: 5,
    marginBottom: 5,
    padding: 50,
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: "white",
    textAlign: "center",
  },
  MetaRowCenter: {
    margin: 10,
    marginBottom: 0,
    marginTop: 0,
    backgroundColor: "red",
    textAlign: "center",
  },
  ButtonRow: {
    flexDirection: "row-reverse",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  ButtonRowA: {
    flexDirection: "row-reverse",
    // marginHorizontal: 20,
    marginBottom: 15,
  },
  ButtonRowB: {
    // flexDirection: "row-reverse",
    // marginHorizontal: 20,
    marginBottom: 15,
  },
  ButtonRowNew1: {
    textAlign: "center",
    flex: 1,
  },
  ButtonRowNew: {
    textAlign: "center",
    // marginBottom: 15,
    width: "100%",
    flex: 1,
  },
  SaveButton: {
    backgroundColor: "#87c8e0",
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 9,
  },

  SaveButtonNew: {
    backgroundColor: "#87c8e0",
    color: "white",
    borderRadius: 9,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  SaveButtonNew2: {
    backgroundColor: "salmon",
    color: "white",
    borderRadius: 9,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  SaveButton2: {
    backgroundColor: "salmon",
    color: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 9,
  },
  SaveButtonText: {
    fontWeight: "700",
    color: "yellow",
    textAlign: "center",
    marginTop: 15,
  },
  MetaTitleTextView: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  MetaTitleTextViewDays: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    width: 75,
  },
  MetaTitleText: {
    fontWeight: "700",
    marginTop: 1,
    marginBottom: 1,
    color: "#111111",

    justifyContent: "center",
  },
  MetaTitleTextSM: {
    fontWeight: "300",
    marginTop: 5,
    marginBottom: 5,
    overflow: "visible",
  },
  MetaTitleTextSMFlex: {
    fontWeight: "300",
    marginTop: 5,
    marginBottom: 5,
    width: 200,
  },
  MetaDataText: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
  MetaData: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
  MetaDataTextInput: {
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 1,
    height: 50,
    borderRadius: 9,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
  },
  MetaDataTextInputFlex: {
    borderStyle: "solid",
    borderColor: "#87c8e0",
    borderWidth: 1,
    height: 50,
    borderRadius: 9,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    width: 60,
  },
  MetaDataParagraphInput: {
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 9,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    minHeight: 80,
    textAlign: "left",
  },
  signUpFieldTextContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  inputField: {
    flex: 1,
    borderStyle: "solid",
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 5,
    paddingTop: 15,
    borderRadius: 9,
    height: 50,
  },

  inputFieldBtn: {
    flex: 1,
    padding: 20,
    paddingTop: 15,
    borderRadius: 9,
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-end",
  },
  titleText: {
    fontWeight: "200",
    marginBottom: 10,
    // paddingLeft: 50,
    fontSize: 25,
    color: "#121212",
    textAlign: "center",
  },
});
