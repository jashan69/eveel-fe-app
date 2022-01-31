import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { TextInput } from "react-native-paper";
import {
  AntDesign,
  Entypo,
  Feather,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Color from "../../../assets/Color";
import { useSelector } from "react-redux";

const DrawerContent = (props) => {
  const user = useSelector((state) => state.auth);
  return (
    <View style={{ flex: 1, backgroundColor: Color.black, justifyContent:'space-between', paddingBottom:8 }}>
      <View style={{ marginTop: 40, margin: 15, alignSelf: "center" }}>
        <Image
          source={require("../../../assets/Images/Ellipse.png")}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
        <TouchableOpacity style={{ opacity: 0.5, paddingTop: 10 }}>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              textAlign: "center",
              fontFamily: "medium",
            }}
          >
            {user.first_name} {user.last_name}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 50,
          }}
        >
          <Text style={{ fontSize: 20, color: "white", fontFamily: "bold" }}>
            123
          </Text>
          <Text style={{ fontSize: 20, color: "white", fontFamily: "bold" }}>
            Liked items
          </Text>
        </View>
        <View
          style={{ marginVertical: 20, marginHorizontal: 30, paddingTop: 50 }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Fontisto name="bell" size={24} color={Color.lightgreen} />
            <View style={{ alignSelf: "center" }}>
              <Text
                style={{
                  fontFamily: "bold",
                  color: Color.lightgreen,
                  fontSize: 20,
                }}
              >
                Notifications
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20, marginHorizontal: 30 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Entypo name="back-in-time" size={25} color={Color.lightgreen} />
            <View style={{ alignSelf: "center" }}>
              <Text
                style={{
                  fontFamily: "bold",
                  color: Color.lightgreen,
                  fontSize: 20,
                }}
              >
                Delivery history
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20, marginHorizontal: 30 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AntDesign name="picture" size={24} color={Color.lightgreen} />
            <View style={{ alignSelf: "center" }}>
              <Text
                style={{
                  fontFamily: "bold",
                  color: Color.lightgreen,
                  fontSize: 20,
                }}
              >
                Analytics
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20, marginHorizontal: 30 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Ionicons
              name="ios-wallet-outline"
              size={24}
              color={Color.lightgreen}
            />
            <View style={{ alignSelf: "center" }}>
              <Text
                style={{
                  fontFamily: "bold",
                  color: Color.lightgreen,
                  fontSize: 20,
                }}
              >
                Payouts
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20, marginHorizontal: 30 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <MaterialCommunityIcons
              name="message-arrow-right-outline"
              size={24}
              color={Color.lightgreen}
            />
            <View style={{ alignSelf: "center" }}>
              <Text
                style={{
                  fontFamily: "bold",
                  color: Color.lightgreen,
                  fontSize: 20,
                }}
              >
                Help
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20, marginHorizontal: 30 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Feather name="settings" size={24} color={Color.lightgreen} />
            <View style={{ alignSelf: "center" }}>
              <Text
                style={{
                  fontFamily: "bold",
                  color: Color.lightgreen,
                  fontSize: 20,
                }}
              >
                Settings
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{width:'90%', borderColor:Color.lightgreen, padding:8, borderWidth:0.5, alignSelf:'center', borderRadius:8, flexDirection:'row', justifyContent:'space-between'}}>
            <AntDesign
              name="logout"
              size={24}
              color={Color.lightgreen}
            />
              <Text
                style={{
                  fontFamily: "bold",
                  color: Color.lightgreen,
                  fontSize: 20,
                }}
              >
                Logout
              </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerContent;
