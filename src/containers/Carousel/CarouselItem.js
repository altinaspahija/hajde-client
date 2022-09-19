import React, { useMemo, useCallback, useRef, memo } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import BannerSmall from '@/utils/BannerSmall';
import BannerLargeImage from '@/utils/BannerLargeImage';
import BannerBoncImage from '@/utils/BannerBoncImage';
import Toast from "react-native-toast-message";


const getWidgetType = (shape) => {
  switch (shape) {
    case 'main':
      return 'X_LARGE_EGG_BANNER';
    case 'bonc':
      return 'SMALL_BANNER';
    case 'banner-small':
      return 'SMALL_BANNER';
    case 'smart-baskets':
      return 'SMART_BASKETS';
    default:
      return 'LARGE_BANNER';
  }
};

const CarouselItem = ({
  item,
  shape = 'banner-large',
  onPress,
  children,
  ...restProps
}) => {
  /*
    if carousel is set to loop, the item will be cloned and the id will not be unique which will confuse the shared element, hence appending Date.now
  */
  const sharedElementIdRef = useRef(
    restProps.sharedElementId || `${item.id}-${Date.now()}`
  );
  const onPressHandler = useCallback(() => {
    onPress?.(item.id, getWidgetType(shape), sharedElementIdRef.current);
  }, [onPress, shape, item?.id]);

  const disabled = !onPress;

  return useMemo(() => {
    if (shape === 'main') {
      return (
        <>
          {children}
        </>
      );
    }

    if (shape === 'bonc') {
      return (
       
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={item.onPress}
          // disabled={disabled}
          style={styles.centered}
        >
           <BannerBoncImage
          {...item}
          {...restProps}
        />
        </TouchableOpacity>
      );
    }
    if (shape === 'banner-small') {
      return (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPressHandler}
          disabled={disabled}
          style={styles.centered}
        >
          <BannerSmall
            light
            {...item}
            {...restProps}
            sharedElementId={sharedElementIdRef.current}
          />
          {children}
        </TouchableOpacity>
      );
    }
    if (shape === 'smart-baskets') {
      return (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPressHandler}
          disabled={disabled}
          style={styles.centered}
        >
          {children}
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPressHandler}
        disabled={disabled}
        style={styles.centered}
      >
        <BannerLargeImage
          {...item}
          {...restProps}
          sharedElementId={sharedElementIdRef.current}
        />
        {children}
      </TouchableOpacity>
    );
  }, [shape, item, restProps, disabled, onPressHandler, children]);
};

export default memo(CarouselItem);

const styles = StyleSheet.create({
  centered: { justifyContent: 'center', alignItems: 'center' },
});
