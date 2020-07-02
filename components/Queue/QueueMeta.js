import React, { useState, useEffect, Component } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
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
  CheckBox,
  TextInput,
  DatePickerIOS,
  TimePickerIOS,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

function QueueMeta({ queueData, userObj, editing, updateQueueMeta }) {
  const [title, setTitle] = useState(queueData.title);
  const [message, setMessage] = useState(queueData.message);
  const [open, setOpen] = useState(queueData.hours.open);
  const [close, setClose] = useState(queueData.hours.close);
  const [city, setCity] = useState(queueData.city);
  const [state, setState] = useState(queueData.state);
  const [id, setId] = useState(queueData.id);
  const [count, setCount] = useState(queueData.count);
  const [active, setactive] = useState(queueData.active);
  const [mask, setMask] = useState(queueData.mask);
  const [sani, setSani] = useState(queueData.sani);
  const [maxCount, setMaxCount] = useState(
    typeof queueData.maxCount === "object"
      ? queueData.maxCount["$numberDouble"]
      : queueData.maxCount
  );
  const [businessNumber, setBusinessNumber] = useState(
    queueData.businessNumber
  );
  const [address, setAddress] = useState(queueData.address);
  const [zipCode, setZipCode] = useState(queueData.zipCode);
  const [showSaving, setShowSaving] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showTimeClose, setShowTimeClose] = useState(false);
  const [og, setOG] = useState({
    title,
    message,
    open,
    close,
    city,
    state,
    active,
    mask,
    sani,
    maxCount,
    businessNumber,
    address,
    zipCode,
  });

  const checkDirty = () => {
    const newObj = {
      title,
      message,
      open,
      close,
      city,
      state,
      active,
      mask,
      sani,
      maxCount,
      businessNumber,
      address,
      zipCode,
    };
    return JSON.stringify(og) !== JSON.stringify(newObj);
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
    // alert(
    //   JSON.stringify({
    //     id,
    //     title,
    //     message,
    //     hours: {
    //       open,
    //       close,
    //     },
    //     count,
    //     active,
    //     address,
    //     zipCode,
    //     city,
    //     state,
    //     mask,
    //     sani,
    //     maxCount,
    //     businessNumber,
    //   })
    // );
    // return;
    await updateQueueMeta({
      id,
      title,
      message,
      hours: {
        open,
        close,
      },
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
    });
    // setTimeout(() => {
    setOG({
      title,
      message,
      open,
      close,
      city,
      state,
      active,
      mask,
      sani,
      maxCount,
      businessNumber,
      address,
      zipCode,
    });
    setShowSaving(false);
    // }, 15=00);
  }

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

                        key: true,
                      },
                      {
                        label: "No",
                        value: false,

                        key: false,
                      },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.MetaRowEditingFlex}>
                <View style={styles.MetaTitleTextView}>
                  <Text style={styles.MetaTitleText}>Masks Available?</Text>
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

                        key: true,
                      },
                      {
                        label: "No",
                        value: false,

                        key: false,
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
                  paddingBottom: 0,
                  paddingTop: 0,
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "row",
                  height: 90,
                }}
              >
                <View style={styles.MetaTitleTextView}>
                  <Text style={styles.MetaTitleText}>Hours</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    padding: 20,
                    paddingTop: 15,
                    borderRadius: 9,
                    height: 90,
                    display: "flex",
                    width: 100,
                    alignContent: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text style={{ textAlign: "right" }}>
                    Open -{" "}
                    <Text
                      onPress={() => {
                        setShowTime(!showTime);
                      }}
                      style={{ color: "#6da8bd", fontWeight: "800" }}
                    >
                      {open}
                    </Text>
                  </Text>
                  <DateTimePickerModal
                    isVisible={showTime}
                    mode="time"
                    headerTextIOS="What time does your business open?"
                    date={timeConvertor(open.replace(/\s/g, ":00"))}
                    onConfirm={(value) => {
                      setOpen(
                        new Date(value)
                          .toLocaleTimeString("en-US")
                          .replace(/:\d{2}\s/g, " ")
                      );
                      setShowTime(!showTime);
                    }}
                    onCancel={(value) => {
                      setShowTime(!showTime);
                    }}
                  />
                  <Text style={{ textAlign: "right", marginTop: 10 }}>
                    Close -{" "}
                    <Text
                      defaultValue={close}
                      onPress={() => {
                        setShowTimeClose(!showTimeClose);
                      }}
                      style={{ color: "#6da8bd", fontWeight: "800" }}
                    >
                      {close}
                    </Text>
                  </Text>
                  <DateTimePickerModal
                    isVisible={showTimeClose}
                    mode="time"
                    headerTextIOS="What time does your business close?"
                    date={timeConvertor(close.replace(/\s/g, ":00"))}
                    onConfirm={(value) => {
                      setClose(
                        new Date(value)
                          .toLocaleTimeString("en-US")
                          .replace(/:\d{2}\s/g, " ")
                      );
                      setShowTimeClose(!showTimeClose);
                    }}
                    onCancel={(value) => {
                      setShowTimeClose(!showTimeClose);
                    }}
                  />
                </View>
              </View>
              <View style={styles.MetaRowEditing}>
                <Text style={styles.MetaTitleText}>City</Text>
                <TextInput
                  style={styles.MetaDataTextInput}
                  defaultValue={city}
                  onChangeText={(value) => setCity(value)}
                ></TextInput>
              </View>
              <View style={styles.MetaRowEditing}>
                <Text style={styles.MetaTitleText}>State</Text>
                <View style={styles.inputField}>
                  <RNPickerSelect
                    onValueChange={(value) => setState(value)}
                    value={state}
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

                        key: true,
                      },
                      {
                        label: "No",
                        value: false,

                        key: false,
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
            bottom: 0,
            backgroundColor: "white",
            width: "100%",
            flex: 1,
            height: 80,
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
      <ScrollView>
        <View style={styles.MetaContainer}>
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
            <View style={styles.ButtonRow}>
              {!checkDirty() ? (
                <TouchableOpacity
                  style={styles.SaveButton}
                  onPress={() => update()}
                >
                  <Text style={styles.SaveButtonText}>Update</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.SaveButton2}
                  onPress={() => update()}
                >
                  <Text style={styles.SaveButtonText}>Update</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
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
    paddingTop: 10,
    // flex: 1,
    overflow: "scroll",
    justifyContent: "flex-end",
  },
  MetaContainerEditing: {
    paddingTop: 10,
    // flex: 1,
    overflow: "scroll",
    justifyContent: "flex-end",
    backgroundColor: "#f5f5f5",
    paddingBottom: 100,
  },
  MetaRow: {
    padding: 10,
    marginBottom: -10,
    marginTop: 0,
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
  ButtonRowNew1: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    flex: 1,
  },
  ButtonRowNew: {
    textAlign: "center",
    // marginBottom: 15,
    width: "100%",
    display: "flex",
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
    padding: 20,
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
    padding: 20,
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
  },
  MetaTitleTextView: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
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
    paddingLeft: 50,
    fontSize: 25,
    color: "#121212",
    // textAlign: "center",
  },
});
