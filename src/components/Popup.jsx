import PropTypes from 'prop-types';

const Popup = ({ positionX, positionY }) => {
  //console.log(positionX, positionY);
  const style = {
    position: 'absolute',
    top: `${positionY}px`,
    left: `${positionX}px`,
  };

  return (
    <div className="popup" style={style}>Popup</div>
  )
}

Popup.propTypes = {
  positionX: PropTypes.number,
  positionY: PropTypes.number,
};

export default Popup