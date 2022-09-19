import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { s, vs, ms, mvs } from "react-native-size-matters";

export default (props) => {
  return (
    <TouchableOpacity
      key={props.id}
      onPress={props.onPress}
      style={{
        // height: mvs(100, 0.9),
        // width: mvs(100),
        marginLeft: mvs(5),
      }}
    >
      <View key={props.id} style={{ flex: 1 }}>
        <Image
          source={props.imageUri}
          style={{ width: s(100), height: s(95), resizeMode: "contain" }}
        />
      </View>
      <View
        style={{
          flex: 0.1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!props.active && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              backgroundColor: "#00CCBB",
              width: 65,
              height: 15,
            }}
          >
            <Text
              style={{
                fontSize: mvs(8),
                fontFamily: "Montserrat-SemiBold",
                color: "white",
              }}
            >
              SË SHPEJTI
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
          alignItems: "center",
          //paddingBottom: mvs(25),
        }}
      >
        <Text
          style={{
            fontSize: mvs(12),
            fontFamily: "Montserrat-Regular",
          }}
        >
          {props.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
