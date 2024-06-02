import { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../utils/formatTime';
import { TimerContext } from '../contexts/TimerContext';


const Timer = ({  isFinished }) => {
  const [counter, setCounter] = useState(0);
  const timerContext = useContext(TimerContext);

  useEffect(() => {
    if (!isFinished) {
      const intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 10); // Update every 10 milliseconds
  
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [setCounter, isFinished]);

  useEffect(() => {
    if (isFinished) {
      timerContext.updateCounter(counter);
    }
  }, [counter, setCounter, isFinished, timerContext]);

  return (
    <div className='timer-container'>
      <span className='timer-title'>Elapsed time</span> 
      <span className='timer-count'>{formatTime(counter)}</span>
    </div>
  );
};

Timer.propTypes = {
  isFinished: PropTypes.bool.isRequired,
};

export default Timer;
