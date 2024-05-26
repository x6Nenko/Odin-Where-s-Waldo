import picture from "/gameone-min.jpeg"
import Popup from "../components/Popup"
import { useState } from "react"

const GameOne = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({});
  const [foundChars, setFoundChars] = useState([
    {
      name: "Guts",
      found: false,
      // x and y where to place marker when char was found
      x: 0.4724119810825013,
      y: 0.8827252419955324,
    },
    {
      name: "Griffith",
      found: false,
      x: 0.03205465055176038,
      y: 0.4571854058078928,
    },
    {
      name: "Crash",
      found: false,
      x: 0.4976353126642144,
      y: 0.5692479523454952,
    },
  ]);

  const handleImgClick = (event) => {
    const x = event.nativeEvent.offsetX/event.nativeEvent.target.offsetWidth;
    const y = event.nativeEvent.offsetY/event.nativeEvent.target.offsetHeight;
    
    console.log({ x, y });

    setCurrentPosition({x: x, y: y});
    setIsOpen(!isOpen);
  };

  const handleSelectingCharacter = async (e, selectedChar) => {
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

        if (responseData.match) {
          setIsOpen(!isOpen);
          setFoundChars(foundChars.map(char => {
            if (char.name === selectedChar) {
              return {...char, found: true };
            } else {
              return char;
            }
          }));
        } else {
          setIsOpen(!isOpen);
        }

        return console.log(responseData.match);
      } else {
        const responseData = await response.json(); // Extract JSON from the response
        console.error('Something went wrong:', responseData);
      }
    } catch (error) {
      console.error('Something went wrong:', error);
      // Handle other error cases
    }
  };

  return (
    <main>
      <div className="image-container" >
        <img src={picture} alt="" className="game-picture" onClick={(e) => handleImgClick(e)} />

        {isOpen && 
          <Popup positionX={currentPosition.x} positionY={currentPosition.y} handleSelect={handleSelectingCharacter} />
        }

        {foundChars.map((char, index) => 
          char.found ? (
            <div className="found-marker" key={index} style={{position: "absolute", top: `calc(${char.y * 100}%)`, left: `calc(${char.x * 100}%)`}}></div>
          ) : null
        )}
      </div>
    </main>
  )
}

export default GameOne