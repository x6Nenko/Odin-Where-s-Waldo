import picture from "/gameone-min.jpeg"
import Popup from "../components/Popup"
import { useState } from "react"

const GameOne = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({});

  const handleImgClick = (event) => {
    const x = event.nativeEvent.offsetX/event.nativeEvent.target.offsetWidth;
    const y = event.nativeEvent.offsetY/event.nativeEvent.target.offsetHeight;
    
    console.log({ x, y });

    setCurrentPosition({x: x, y: y});
    setIsOpen(!isOpen);
  };

  const handleSelectingCharacter = async (e, selectedChar) => {
    console.log(selectedChar);
    console.log(currentPosition);

    e.preventDefault();

    const formData = {
      selectedCharacter: selectedChar,
      pickedPosition: currentPosition,
    }

    try {
      const response = await fetch('http://localhost:3000/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const responseData = await response.json(); // Extract JSON from the response
        console.log(responseData);
        return console.log("success");
      } else {
        const responseData = await response.json(); // Extract JSON from the response
        console.error('Something went wrong:', responseData);
      }
    } catch (error) {
      console.error('Something went wrong:', error);
      // Handle other error cases
    }
  };

  const checkCoordinates = (event) => {
    
  };

  return (
    <main>
      <div className="image-container" >
        <img src={picture} alt="" className="game-picture" onClick={(e) => handleImgClick(e)} />

        {isOpen && 
          <Popup positionX={currentPosition.x} positionY={currentPosition.y} handleSelect={handleSelectingCharacter} />
        }
      </div>
    </main>
  )
}

export default GameOne