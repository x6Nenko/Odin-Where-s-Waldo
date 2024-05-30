import PropTypes from 'prop-types';

const Popup = ({ positionX, positionY, handleSelect, chars }) => {
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
        {chars.map((char, index) => (
          char.found ? 
          <button key={index} onClick={(e) => handleSelect(e, char.name)} disabled>{char.name}</button>
          :
          <button key={index} onClick={(e) => handleSelect(e, char.name)}>{char.name}</button>
        ))}
      </div>
    </div>
  )
}

Popup.propTypes = {
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  handleSelect: PropTypes.func,
  chars: PropTypes.array.isRequired,
};

export default Popup