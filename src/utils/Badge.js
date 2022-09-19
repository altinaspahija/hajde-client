import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, } from "react-native";
import { useTheme } from "@/hooks";
import RichText from "./RichText";

export const BADGE_BIG_SIZE = 85;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeRound: {
    position: "absolute",
    width: BADGE_BIG_SIZE,
    height: BADGE_BIG_SIZE,
    borderRadius: BADGE_BIG_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    overflow: "hidden",
    padding: 3,
  },
  largeBadgeText: {
    textAlign: "center",
    fontWeight: "500",
    maxWidth: BADGE_BIG_SIZE,
    paddingHorizontal: 9,
  },
});

const Badge = ({ text, subtext, light = true, style }) => {
  const theme = useTheme();

  const animValue = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(animValue.current, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!text && !subtext) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.badgeRound,
        {
          backgroundColor: light ? theme.Colors.white : theme.Colors.accent,
        },
        {
          transform: [
            {
              scale: animValue.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
          ],
        },
        style,
      ]}
    >
      <View style={styles.container}>
        <RichText
            stylesheet={{
              p: [styles.largeBadgeText, { color: theme.Colors.primary }],
            }}
            text={text}
          />
      </View>
    </Animated.View>
  );
};

export default Badge;
