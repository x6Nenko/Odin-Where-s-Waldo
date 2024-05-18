import PropTypes from 'prop-types';

const Popup = ({ positionX, positionY }) => {
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
        <button>Waldo 1</button>
        <button>Waldo 2</button>
        <button>Waldo 3</button>
      </div>
    </div>
  )
}

Popup.propTypes = {
  positionX: PropTypes.number,
  positionY: PropTypes.number,
};

export default Popup