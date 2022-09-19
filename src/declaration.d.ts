// Typescript declaration to import SVG files as modules
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare type Noop = () => void;

declare type HashMap<T> = { [key: string]: T };

declare function vp(size: number): number;
