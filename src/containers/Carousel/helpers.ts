import { Dimensions, Animated } from 'react-native';
import {
  CarouselProps,
  getInputRangeFromIndexes,
} from 'react-native-snap-carousel';
const { width: WINDOW_WIDTH } = Dimensions.get('window');

const SLIDER_WIDTH = WINDOW_WIDTH;
const EGG_ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.62);
const TRANSLATE_VALUE = Math.round(SLIDER_WIDTH * 0.1);

function scrollInterpolator(index: number, carouselProps: CarouselProps<any>) {
  const range = [1, 0, -1];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;

  return { inputRange, outputRange };
}

function animatedStyles(
  index: number,
  animatedValue: Animated.Value,
  carouselProps: CarouselProps<any>
) {
  const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';
  let animatedOpacity = {};
  let animatedTransform = {};

  if (carouselProps.inactiveSlideOpacity < 1) {
    animatedOpacity = {
      opacity: animatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [
          carouselProps.inactiveSlideOpacity,
          1,
          carouselProps.inactiveSlideOpacity,
        ],
      }),
    };
  }

  if (carouselProps.inactiveSlideScale < 1) {
    animatedTransform = {
      transform: [
        {
          scale: animatedValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [
              carouselProps.inactiveSlideScale,
              1,
              carouselProps.inactiveSlideScale,
            ],
          }),
          [translateProp]: animatedValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [
              TRANSLATE_VALUE * carouselProps.inactiveSlideScale,
              0,
              -TRANSLATE_VALUE * carouselProps.inactiveSlideScale,
            ],
          }),
        },
      ],
    };
  }

  return {
    ...animatedOpacity,
    ...animatedTransform,
  };
}

export {
  SLIDER_WIDTH,
  WINDOW_WIDTH,
  EGG_ITEM_WIDTH,
  TRANSLATE_VALUE,
  scrollInterpolator,
  animatedStyles,
};
