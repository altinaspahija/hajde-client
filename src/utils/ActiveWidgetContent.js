/*
Usage: 
...
        <ActiveWidgetContent
            eventEmitter={carouselEventEmitter}
            data={data}
            hideArrow={hideArrow}
            onPress={onItemPress}
        />
...

*/


import { memo } from "react";

import useActiveIndex from "@/containers/Carousel/useActiveIndex";
import { Text, TouchableOpacity, View } from "react-native";

  const ActiveWidgetContent = ({
    eventEmitter,
    data = [],
    hideArrow,
    onPress,
  }) => {
    const activeIndex = useActiveIndex(eventEmitter, "onSnapToItem");

    const handlePress = useCallback(() => {
      onPress?.(data[activeIndex].id, "LARGE_BANNER");
    }, [data, activeIndex, onPress]);

    const containerProps = useMemo(
      () => ({ marginTop: 5, marginBottom: 5 }),
      []
    );

    const { title, subtitle } = data[activeIndex];

    return (
      <View style={styles.container}>
        <View style={styles.carouselContainer}>
          <TouchableOpacity onPress={handlePress} disabled={hideArrow}>
            <Text numberOfLines={2}>{title}</Text>

            {subtitle && <Text style={containerProps}>{subtitle}</Text>}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  export default memo(ActiveWidgetContent);