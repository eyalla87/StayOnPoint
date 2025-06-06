import { useEffect, useRef, useState } from 'react';
import { DEFAULT_TIMER_SECONDS } from '../constants/appConstants';

interface UseTimerProps {
  initialTime?: number;
  autoStart?: boolean;
  onComplete?: () => void;
}

interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  isComplete: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  restart: () => void;
}

/**
 * Custom hook for managing a countdown timer
 */
export const useTimer = ({
  initialTime = DEFAULT_TIMER_SECONDS,
  autoStart = false,
  onComplete,
}: UseTimerProps = {}): UseTimerReturn => {
  const [time, setTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const savedCallback = useRef(onComplete);

  // Update the saved callback when the onComplete prop changes
  useEffect(() => {
    savedCallback.current = onComplete;
  }, [onComplete]);

  // Set up and clear the interval
  useEffect(() => {
    const tick = () => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsRunning(false);
          setIsComplete(true);
          if (savedCallback.current) {
            savedCallback.current();
          }
          return 0;
        }
        return prevTime - 1;
      });
    };

    if (isRunning) {
      intervalRef.current = setInterval(tick, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // Start the timer
  const start = () => {
    if (!isRunning && time > 0) {
      setIsRunning(true);
      setIsComplete(false);
    }
  };

  // Pause the timer
  const pause = () => {
    setIsRunning(false);
  };

  // Reset the timer
  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTime(initialTime);
    setIsRunning(false);
    setIsComplete(false);
  };

  // Restart the timer
  const restart = () => {
    reset();
    setIsRunning(true);
  };

  return {
    time,
    isRunning,
    isComplete,
    start,
    pause,
    reset,
    restart,
  };
};

export default useTimer;
