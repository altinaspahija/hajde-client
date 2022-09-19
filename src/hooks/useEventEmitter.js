import { useMemo, useEffect } from 'react';
import EventEmitter from 'events';

const defaultMaxListeners = 10;

export const useEventEmitter = (
  {
    maxListeners = defaultMaxListeners,
    defaultEmitter,
  }) => {
  const eventEmitter = useMemo(() => {
    const emitter = defaultEmitter || new EventEmitter();
    if (!defaultEmitter && maxListeners) {
      emitter.setMaxListeners(maxListeners);
    }
    return emitter;
  }, [maxListeners, defaultEmitter]);

  useEffect(
    () => () => {
      eventEmitter.removeAllListeners();
    },
    [eventEmitter, maxListeners]
  );
  return eventEmitter;
}
