// return (
//   <View style={{ flex: 1 }}>
//     <KeyboardAvoidingView
//       enabled
//       style={{ flex: 1 }}
//       keyboardVerticalOffset={100}
//       behavior="padding"
//     >
//       <ScrollView>
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={styles.MetaContainer}>
//             <View style={styles.MetaRow}>
//               <View style={{ paddingRight: 20, paddingLeft: 20 }}>
//                 <Text style={styles.MetaTitleText}>Business Message</Text>
//                 {/* <Text style={styles.MetaData}>{queueData.message}</Text> */}
//                 <TextInput
//                   style={styles.MetaDataParagraphInput}
//                   defaultValue={message}
//                   multiline
//                   numberOfLines={3}
//                   onChangeText={(value) => setMessage(value)}
//                 ></TextInput>
//               </View>
//               {/* <View style={styles.ButtonRow}>
//             {!checkDirty() ? (
//               <TouchableOpacity
//                 style={styles.SaveButton}
//                 onPress={() => update()}
//               >
//                 <Text style={styles.SaveButtonText}>Update</Text>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity
//                 style={styles.SaveButton2}
//                 onPress={() => update()}
//               >
//                 <Text style={styles.SaveButtonText}>Update</Text>
//               </TouchableOpacity>
//             )}
//           </View> */}
//             </View>
//             <View
//               style={{
//                 marginTop: 20,
//                 marginBottom: 5,
//                 padding: 30,
//                 paddingBottom: 0,
//                 paddingTop: 0,
//                 backgroundColor: "white",
//                 // height: 90,
//               }}
//             >
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   height: 90,
//                 }}
//               >
//                 <View style={styles.MetaTitleTextView}>
//                   <Text style={styles.MetaTitleText}>Active</Text>
//                   <View style={styles.MetaTitleTextSMFlex}>
//                     <Text>
//                       Determines if business visible to queue members.
//                     </Text>
//                   </View>
//                 </View>
//                 <View
//                   style={{
//                     flex: 1,
//                     padding: 20,
//                     paddingTop: 15,
//                     borderRadius: 9,
//                     height: 90,
//                     display: "flex",
//                     flexDirection: "row",
//                     alignContent: "center",
//                     justifyContent: "flex-end",
//                     marginTop: 20,
//                   }}
//                 >
//                   <RNPickerSelect
//                     textStyle={{ color: "#5cb85c" }}
//                     style={{ ...pickerSelectStyles }}
//                     onValueChange={(value) => setactive(value)}
//                     value={active}
//                     items={[
//                       {
//                         label: "Yes",
//                         value: true,

//                         key: "true55",
//                       },
//                       {
//                         label: "No",
//                         value: false,

//                         key: "false55",
//                       },
//                     ]}
//                   />
//                 </View>
//               </View>
//               {/* <View style={styles.ButtonRowB}>
//             {!checkDirty() ? (
//               <TouchableOpacity
//                 style={styles.SaveButton}
//                 onPress={() => update()}
//               >
//                 <Text style={styles.SaveButtonText}>Update</Text>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity
//                 style={styles.SaveButton2}
//                 onPress={() => update()}
//               >
//                 <Text style={styles.SaveButtonText}>Update</Text>
//               </TouchableOpacity>
//             )}
//           </View> */}
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </ScrollView>
//     </KeyboardAvoidingView>
//     <View
//       style={{
//         position: "absolute",
//         top: "100%",
//         backgroundColor: "white",
//         width: "100%",
//         flex: 1,
//         height: 80,
//       }}
//     >
//       <View style={styles.ButtonRowNew1}>
//         <View style={styles.ButtonRowNew}>
//           {!checkDirty() ? (
//             <TouchableOpacity
//               style={styles.SaveButtonNew}
//               onPress={() => update()}
//             >
//               <Text style={styles.SaveButtonText}>Update</Text>
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity
//               style={styles.SaveButtonNew2}
//               onPress={() => update()}
//             >
//               <Text style={styles.SaveButtonText}>Update</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </View>
//   </View>
// );
