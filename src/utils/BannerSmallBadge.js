import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks';
import RichText from './RichText';

const HEIGHT = 30;
export const WIDTH = HEIGHT * 4;
const BORDERS_OFFSET = 2;

const TOP_OFFSET = BORDERS_OFFSET;
const RIGHT_OFFSET = HEIGHT / 2;
const COS_30 = 0.866;

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    height: HEIGHT,
    width: WIDTH,
    top: TOP_OFFSET,
    right: -RIGHT_OFFSET - BORDERS_OFFSET + 1,
    transform: [{ rotate: '30deg' }],
    flexDirection: 'row',
  },
  leftTriangle: {
    borderStyle: 'solid',
    borderTopWidth: HEIGHT,
    left: 1,
    borderTopColor: 'transparent',
    borderRightWidth: HEIGHT * COS_30 * 2,
  },
  space: {
    flex: 1,
    alignSelf: 'stretch',
  },
  rightTriangle: {
    borderStyle: 'solid',
    borderRightWidth: RIGHT_OFFSET + BORDERS_OFFSET,
    borderBottomWidth: HEIGHT,
    borderRightColor: 'transparent',
  },
  smallBannerBadgeText: {
    fontFamily: undefined,
    textAlign: 'center',
    fontWeight: '500',
    maxWidth: WIDTH - 45,
  },
});

const BannerSmallBadge = ({
  light,
  children,
}) => {
  const theme = useTheme();
  const color = light ? theme.Colors.primary : theme.Colors.accent;
  const textColor = !light ? theme.Colors.primary : theme.Colors.accent;
  if (!children) return null;

  return (
    <View style={styles.badgeContainer}>
      <>
        <View style={[styles.leftTriangle, { borderRightColor: color }]} />
        <View style={[styles.space, { backgroundColor: color }]} />
        <View style={[styles.rightTriangle, { borderBottomColor: color }]} />
      </>
      <View style={StyleSheet.absoluteFill}>
        <View marginL-28 marginT-2>
          <RichText
            stylesheet={{
              p: [styles.smallBannerBadgeText, { color: textColor }],
            }}
            text={children}
          />
        </View>
      </View>
    </View>
  );
};
export default BannerSmallBadge;
