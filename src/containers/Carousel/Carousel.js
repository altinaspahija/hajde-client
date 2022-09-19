import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Platform,
  InteractionManager,
} from 'react-native';
import SnapCarousel from 'react-native-snap-carousel';

import PaginationContainer from './PaginationContainer';
import CarouselItem from './CarouselItem';

import { SLIDER_WIDTH } from './helpers';

import { useEventEmitter } from '@/hooks';

const defaultOptimizationProps = Platform.select({
  android: {
    removeClippedSubviews: false,
    enableMomentum: false,
    enableSnap: true,
    decelerationRate: 0.1,
  },
  ios: {},
});

const styles = StyleSheet.create({
  alignItemsCenter: {
    alignItems: 'center',
  },
});

const Carousel = ({
  data = [],
  beforeInteractionNumToRender = 1,
  shape = 'banner-large',
  onItemPress,
  children,
  paginationStyle,
  renderItem,
  loop,
  hasParallaxImages,
  carouselEventEmitter,
  optimizationProps = defaultOptimizationProps,
  ...restProps
}) => {
  const [innerData, setInnerData] = useState(
    data?.slice?.(0, beforeInteractionNumToRender)
  );
  const innerDataRef = useRef(innerData);
  innerDataRef.current = innerData;

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      if (
        data?.length > beforeInteractionNumToRender ||
        (data?.length &&
          innerDataRef.current.some(
            (item, index) =>
              item.products?.length !== data[index]?.products?.length
          ))
      ) {
        setInnerData(data);
      }
    });
    return interactionPromise.cancel;
  }, [data, beforeInteractionNumToRender, innerDataRef]);

  const carouselRef = useRef();
  const eventEmitter = useEventEmitter({
    maxListeners: 1,
    defaultEmitter: carouselEventEmitter,
  });

  const renderCarouselItem = useCallback(
    ({ item, index }, paralaxProps = {}) => {
      if (renderItem) {
        return renderItem({ item, index }, paralaxProps);
      }

      return (
        <CarouselItem
          source={item.source}
          item={item}
          shape={shape}
          onPress={onItemPress}
        />
      );
    },
    [renderItem, shape, onItemPress]
  );

  const handleSnapToItem = useCallback(
    (index) => {
      eventEmitter.emit('onBeforeSnapToItem', index);
    },
    [eventEmitter]
  );

  return (
    <>
      <SnapCarousel
        ref={carouselRef}
        hasParallaxImages={hasParallaxImages}
        shouldOptimizeUpdates={false}
        contentContainerCustomStyle={styles.alignItemsCenter}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={SLIDER_WIDTH}
        data={innerData}
        inactiveSlideScale={0.7}
        inactiveSlideShift={0.6}
        inactiveSlideOpacity={1}
        onBeforeSnapToItem={handleSnapToItem}
        autoplay
        loop={loop}
        {...optimizationProps}
        {...restProps}
        firstItem={0}
        renderItem={renderCarouselItem}
        useScrollView={true}
        snapToAlignment="center"
      />
      {children}
      {data?.length > 1 && (
        <PaginationContainer
          eventEmitter={eventEmitter}
          maxLength={data.length}
          paginationStyle={paginationStyle}
        />
      )}
    </>
  );
}

export default Carousel;
