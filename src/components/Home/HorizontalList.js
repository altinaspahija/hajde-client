import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { CategoryContainer } from "@/components";
import { useTheme } from "@/hooks";
import { category, category2 } from "./Category";
import { mvs } from "react-native-size-matters";

export default ({ navigation }) => {
  const { Colors, Common, Layout } = useTheme();
  const { home } = Common;
  const categories = category(navigation);
  const categories2 = category2(navigation);
  return (
    <View style={[Layout.fill, { paddingTop: mvs(18), paddingBottom: 0 }]}>
      <View style={Layout.fill}>
        <View style={[Layout.fill, { paddingBottom: mvs(10) }]}>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.secondary,
            }}
          >
            <Text style={home.titleBody}>Ushqim dhe pije</Text>

            <View style={Layout.fill}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {categories.map((item) => (
                  <CategoryContainer
                    id={item.id}
                    onPress={()=>item.onPress(item)}
                    imageUri={item.imageUri}
                    name={item.name}
                    active={item.active}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
      <View style={Layout.fill}>
        <View style={Layout.fill}>
          <View
            style={{
              flex: 1,
              marginTop: mvs(10),
              backgroundColor: Colors.secondary,
            }}
          >
            <Text style={home.titleBody}>Hajde +</Text>

            <View style={Layout.fill}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {categories2.map((item) => (
                  <CategoryContainer
                    id={item.id}
                    onPress={item.onPress}
                    imageUri={item.imageUri}
                    name={item.name}
                    active={item.active}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
