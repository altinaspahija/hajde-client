import React from 'react';
import { StyleSheet } from 'react-native';
import { Pagination as SnapPagination } from 'react-native-snap-carousel';

const Pagination = ({ activeDotIndex = 0, maxLength = 4 }) => {
  return (
    <SnapPagination
      dotColor={'#303030'}
      inactiveDotColor={'#6D6D6D'}
      inactiveDotOpacity={0.8}
      inactiveDotScale={1}
      activeDotIndex={activeDotIndex % maxLength}
      dotsLength={maxLength}
      containerStyle={styles.containerStyle}
      dotContainerStyle={[styles.dotContainerStyle, styles.boxWithShadow]}
      dotStyle={styles.dotStyle}
      inactiveDotStyle={styles.inactiveDotStyle}
    />
  );
};

export default Pagination;



const styles = StyleSheet.create({
  containerStyle: {
    paddingBottom: 10,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  dotContainerStyle: {
    marginHorizontal: 6,
  },
  dotStyle: {
    width: 16,
    height: 16,
    borderRadius: 50,
  },
  inactiveDotStyle: {
    borderRadius: 50,
    width: 14,
    height: 14,
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,  
    elevation: 5
}
});
