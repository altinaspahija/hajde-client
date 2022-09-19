import React, { memo, useState, useCallback } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import BannerSmallBadge from './BannerSmallBadge';
import CoreImage from './CoreImage';
import BannerPlaceholder from './BannerPlaceholder';
import RichText from './RichText';


const { width: WINDOW_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerSmall: {
    width: WINDOW_WIDTH - 44,
    height: 137,
    borderRadius: 16,
    overflow: 'hidden',
  },
  containerView: {
    flex: 1, 
    paddingLeft: 25,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    flexDirection: 'row'
  },
});

const Overlay = ({
  light,
  title,
  subtitle,
  badge,
  titleColor,
  subtitleColor,
}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.containerView}>
        {title ? (
          <Text
            numberOfLines={2}
            color={titleColor}
          >
            {title}
          </Text>
        ) : null}
        <RichText
          stylesheet={{
            p: [
              {
                fontFamily: undefined,
                color: subtitleColor || titleColor,
                marginTop: 7,
              },
            ],
          }}
          text={subtitle}
        />
      </View>
      <View/>
      <BannerSmallBadge light={light}>{badge}</BannerSmallBadge>
    </View>
  );
};

const BannerSmall = ({
  title,
  subtitle,
  badge,
  onPress,
  disabled,
  titleColor = 'white',
  subtitleColor,
  ...restProps
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const onLoadEnd = useCallback(() => {
    setLoaded(true);
  }, []);
  return (
    <View style={styles.container}>
      <CoreImage
        {...restProps}
        style={styles.bannerSmall}
        onLoadEnd={onLoadEnd}
      />
      <Overlay
        light={badge?.light}
        title={title}
        subtitle={subtitle}
        badge={badge?.text}
        titleColor={titleColor}
        subtitleColor={subtitleColor}
      />
      {!isLoaded && <BannerPlaceholder style={styles.bannerSmall} />}
    </View>
  );
};

export default memo(BannerSmall);
