import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);

  const updateCounter = (newCounter) => {
    setCounter(newCounter);
  };

  return (
    <TimerContext.Provider value={{ counter, updateCounter }}>
      {children}
    </TimerContext.Provider>
  );
};

TimerProvider.propTypes = {
  children: PropTypes.node,
};
