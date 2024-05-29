import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../utils/formatTime';


const Timer = ({ counter, setCounter, isFinished }) => {

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

  return (
    <div>
      <p>Elapsed time: {formatTime(counter)}</p>
    </div>
  );
};

Timer.propTypes = {
  counter: PropTypes.number.isRequired,
  setCounter: PropTypes.func.isRequired,
  isFinished: PropTypes.bool.isRequired,
};

export default Timer;
