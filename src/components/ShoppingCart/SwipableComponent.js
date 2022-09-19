//External dependencies
import React, { useRef } from "react";
import { View, Text, Animated } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialIcons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

// Internal dependencies
import { DecrementButton, QuickButton } from "../../components/Button/Button";
import { useTheme } from "@/hooks";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function SwipableComponent({
  id,
  name,
  price,
  quantity,
  navigation,
  currency,
  removeProduct,
  incNum,
  decNum,
  index,
  manual,
  customId,
}) {
  const swipableRef = useRef(null);
  const { Common } = useTheme();
  const {
    baseText,
    deleteBox,
    itemsContainer,
    quantityText,
    nameContainer,
    itemContainer,
    number,
    button,
  } = Common.shoppingCart;
  const rightSwipe = (progress, dragX, Id) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
    });
    return (
      <View style={{ minHeight: 30, justifyContent: "center" }}>
        <RectButton
          onPress={async () => {
            swipableRef.current.close();
            const removedItem = await removeProduct(
              customId ? id.split("_")[0] : name,
            );
          }}
          activeOpacity={10}
          style={{ marginVertical: 10 }}
        >
          <View style={[deleteBox]}>
            <Animated.Text style={{ transform: [{ scale: scale }] }}>
              <MaterialIcons name="delete-forever" size={30} color="black" />
            </Animated.Text>
          </View>
        </RectButton>
      </View>
    );
  };

  return (
    <View style={{ minHeight: 30 }}>
      <Swipeable
        ref={swipableRef}
        key={id}
        renderRightActions={(progress, dragX) =>
          rightSwipe(progress, dragX, manual ? name : id)
        }
        renderLeftActions={false}
        id={id}
      >
        <View style={itemsContainer}>
          {price !== null && price !== undefined ? (
            <View style={nameContainer}>
              <Text style={quantityText}>{quantity}x</Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={baseText}>
                {name}
              </Text>
              <Text>
                {" "}
                ({price} {currency})
              </Text>
            </View>
          ) : (
            <View style={nameContainer}>
              <Text style={quantityText}>{quantity}x</Text>
              <Text numberOfLines={1} ellipsizeMode="tail">
                {name}
              </Text>
            </View>
          )}

          <View style={itemContainer}>
            {manual ? (
              <>
                <DecrementButton
                  iconColor={Colors.white}
                  style={button}
                  onPress={() => decNum(index, name, true)}
                />
                <Text style={number}>{quantity}</Text>
                <QuickButton
                  iconColor={Colors.white}
                  style={Colors.primary}
                  onPress={() => incNum(index, name, true)}
                />
              </>
            ) : (
              <>
                <DecrementButton
                  iconColor={Colors.white}
                  style={button}
                  onPress={() => decNum(index, id, false)}
                />
                <Text style={number}>{quantity}</Text>
                <QuickButton
                  iconColor={Colors.white}
                  style={button}
                  onPress={() => incNum(index, id, false)}
                />
              </>
            )}
          </View>
        </View>
      </Swipeable>
    </View>
  );
}
