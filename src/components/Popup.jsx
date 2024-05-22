import PropTypes from 'prop-types';

const Popup = ({ positionX, positionY, handleSelect }) => {
  const style = {
    position: 'absolute',
    top: `${positionY - 38}px`,
    left: `${positionX - 38}px`,
  };

  return (
    <div className="popup" style={style}>
      <div className='target'>
        <div className='target-dot'></div>
      </div>

      <div className='dropdown'>
        <button onClick={(e) => handleSelect(e, "Waldo 1")}>Waldo 1</button>
        <button onClick={(e) => handleSelect(e, "Waldo 2")}>Waldo 2</button>
        <button onClick={(e) => handleSelect(e, "Waldo 3")}>Waldo 3</button>
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