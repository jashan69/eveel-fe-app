import React, { useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Color from "../../../../assets/Color";
const OTP = (props) => {
  const [code, setCode] = useState(null);
  return (
    <View>
      <View style={{ margin: 15, paddingTop: 30 }}>
        <Text style={{ color: Color.white, fontFamily: "bold", fontSize: 28 }}>
          We have you an OTP through SMS
        </Text>
      </View>
      <View
        style={{
          backgroundColor: Color.darkgrey,
          margin: 15,
          padding: 10,
          borderRadius: 10,
          alignSelf: "center",
        }}
      >
        <TextInput
          placeholder="OTP"
          placeholderTextColor="grey"
          keyboardType="numeric"
          value={code}
          onChangeText={setCode}
          style={{ fontSize: 24, color: Color.white, paddingHorizontal: 30 }}
        />
      </View>
      <View
        style={{
          marginHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontFamily: "light" }}>
          Haven't recieved the code
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.resend();
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontFamily: "bold" }}>
            Resend code?
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignSelf: "center",
          paddingTop: 100,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Color.darkgreen,
            padding: 15,
            borderRadius: 20,
          }}
          onPress={() => {
            props.sendCode(code);
          }}
        >
          <Text
            style={{
              color: Color.white,
              fontFamily: "bold",
              fontSize: 20,
              paddingHorizontal: 10,
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTP;
