import { useState, useEffect } from 'react';
import EventEmitter from 'events';

export default (
  eventEmmiter,
  eventName = 'onBeforeSnapToItem',
  defaultIndex = 0
) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  useEffect(() => {
    const listener = (index) => {
      requestAnimationFrame(() => setActiveIndex(index));
    };
    eventEmmiter.on(eventName, listener);
    return () => {
      eventEmmiter.removeListener(eventName, listener);
    };
  }, [eventEmmiter, eventName]);

  return activeIndex;
};
