import React from 'react';
import FastImage from 'react-native-fast-image';

const getSource = (source = {}) => {
  return {
    headers: {
      Accept: 'image/webp',
    },
    ...source,
  };
};

const CoreImage = ({ style, resizeMode, source, ...restProps }) => {
  return (
    <FastImage
      testID="image"
      {...restProps}
      resizeMode={resizeMode && FastImage.resizeMode.contain}
      source={source}
      style={style}
    />
  );
};

export default CoreImage;
