import React from 'react';
import { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import HTMLView from 'react-native-htmlview';

const RichText = ({
  text,
  stylesheet = {},
  textComponentProps,
}) => {
  if (!text) return null;

  return (
    <HTMLView
      value={text}
      stylesheet={{
        strong: {
          fontWeight: '800',
        },
        em: {
          fontStyle: 'italic',
        },
        ...stylesheet,
      }}
      addLineBreaks={false}
      textComponentProps={textComponentProps}
    />
  );
};

export default RichText;
