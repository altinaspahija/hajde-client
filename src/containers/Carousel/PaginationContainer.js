import React, { memo } from 'react';
import { StyleProp, StyleSheet, ViewStyle, View } from 'react-native';
import Pagination from '@/containers/Carousel/Pagination';
import useActiveIndex from '@/containers/Carousel/useActiveIndex';

const styles = StyleSheet.create({
  alignItemsStart: {
    paddingTop: 5,
    alignItems: 'center',
  },
});

const PaginationContainer = ({
  eventEmitter,
  maxLength,
  paginationStyle,
}) => {
  const activeIndex = useActiveIndex(eventEmitter);

  return (
    <View style={[styles.alignItemsStart, paginationStyle]}>
      <Pagination activeDotIndex={activeIndex} maxLength={maxLength} />
    </View>
  );
};

export default memo(PaginationContainer);
