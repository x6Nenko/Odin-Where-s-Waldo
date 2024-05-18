import picture from "/gameone-min.jpeg"
import Popup from "../components/Popup"
import { useState } from "react"

const GameOne = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({});

  const handleClick = (event) => {
    const x = event.pageX; // X coordinate relative to the document
    const y = event.pageY; // Y coordinate relative to the document
    
    console.log({ x, y });

    setCurrentPosition({x: x, y: y});
    setIsOpen(!isOpen);
  };

  //console.log(mousePosition);
  return (
    <main>
      <div className="image-container" >
        <img src={picture} alt="" className="game-picture" onClick={(e) => handleClick(e)} />

        {isOpen && 
          <Popup positionX={currentPosition.x} positionY={currentPosition.y} />
        }
      </div>
    </main>
  )
}

export default GameOne