import PropTypes from 'prop-types';

const Popup = ({ positionX, positionY, handleSelect }) => {
  const style = {
    position: 'absolute',
    top: `calc(${positionY * 100}% - 41px)`,
    left: `calc(${positionX * 100}% - 37.3px)`,
  };

  return (
    <div className="popup" style={style}>
      <div className='target'>
        <div className='target-dot'></div>
      </div>

      <div className='dropdown'>
        <button onClick={(e) => handleSelect(e, "Guts")}>Guts</button>
        <button onClick={(e) => handleSelect(e, "Griffith")}>Griffith</button>
        <button onClick={(e) => handleSelect(e, "Crash")}>Crash</button>
      </div>
    </div>
  )
}

Popup.propTypes = {
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  handleSelect: PropTypes.func,
};

export default Popup