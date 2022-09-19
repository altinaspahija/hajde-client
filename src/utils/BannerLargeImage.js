import React, { useState, useCallback } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import CoreImage from "@/utils/CoreImage";
import { useTheme } from "@/hooks";
import Badge, { BADGE_BIG_SIZE } from "@/utils/Badge";
import BannerPlaceholder from "@/utils/BannerPlaceholder";
import RichText from "./RichText";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const Overlay = ({ title, subtitle, badgeProps }) => {
  const theme = useTheme();
  return (
    <View style={styles.overlay}>
      <View style={styles.fill}>
        <Text numberOfLines={2}>{title}</Text>
        <RichText
            stylesheet={{
              p: [styles.smallBannerBadgeText, { color: theme.Colors.primary }],
            }}
            text={subtitle}
          />
        </View>
      {badgeProps?.text && <Badge style={styles.eggBadge} {...badgeProps} />}
    </View>
  );
};

const BannerLargeImage = ({
  // id,
  title,
  subtitle,
  onPress,
  containerStyle,
  badge,
  source,
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const onLoadEnd = useCallback(() => {
    setLoaded(true);
  }, []);
  return (
    <View style={[styles.container, containerStyle]}>
      <CoreImage
        style={styles.image}
        borderRadius={styles.image.borderRadius}
        source={source}
        onLoadEnd={onLoadEnd}
      />
      <Overlay
        title={title}
        subtitle={subtitle}
        onPress={onPress}
        badgeProps={badge}
      />
      {!isLoaded && <BannerPlaceholder style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  fill: {
    flex: 1,
    marginLeft: 25,
    marginTop: 25,
    marginRight: 100,
  },
  image: {
    width: WINDOW_WIDTH - 124,
    height: 179,
    borderRadius: 20,
  },
  parallaxContainerStyle: {
    width: WINDOW_WIDTH - 124,
    height: 179,
  },
  arrowButton: {
    marginBottom: 16,
    marginLeft: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  eggBadge: {
    left: BADGE_BIG_SIZE / 4,
    bottom: BADGE_BIG_SIZE / 4,
  },
  subtitle: {
    fontFamily: undefined,
  },
});

export default BannerLargeImage;
