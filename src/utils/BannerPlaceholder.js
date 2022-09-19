import React from 'react';
import { StyleSheet, View } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

const BannerPlaceholder = ({ style }) => (
  <View style={[style, styles.contentLoader]}>
    <ContentLoader animate={false}>
      <Rect width={'100%'} height={'100%'} />
    </ContentLoader>
  </View>
);

const styles = StyleSheet.create({
  contentLoader: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

export default BannerPlaceholder;
