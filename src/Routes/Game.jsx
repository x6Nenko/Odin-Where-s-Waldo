import Popup from "../components/Popup"
import { useState, useEffect, useContext } from "react"
import Timer from "../components/Timer"
import { formatTime } from '../utils/formatTime';
import { useNavigate, useLocation } from "react-router-dom";
import { gameData } from "../utils/gameData";
import { TimerContext } from "../contexts/TimerContext";

const Game = () => {
  const location = useLocation();
  const timerContext = useContext(TimerContext);
  const selectedGame = gameData.find(gameEntry => gameEntry.game === location.pathname);

  const [isOpen, setIsOpen] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [finishedGame, setFinishedGame] = useState(false);
  const [username, setUsername] = useState("");
  const [currentPosition, setCurrentPosition] = useState({});
  const [foundChars, setFoundChars] = useState(selectedGame.chars);

  const navigate = useNavigate();

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
          setIsWrong(true);
          setTimeout(function() {
            setIsWrong(false)
          } , 1500);

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

  const handleSavingTT = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(formatTime(timerContext.counter));

    const formData = {
      username: username,
      toptime: formatTime(timerContext.counter),
      game: "Game1",
    }

    try {
      const response = await fetch('http://localhost:3000/toptime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        return navigate("/leaderboard");
      } else {
        const responseData = await response.json(); // Extract JSON from the response
        console.error('Something went wrong:', responseData);
      }
    } catch (error) {
      console.error('Something went wrong:', error);
      // Handle other error cases
    }
  };

  useEffect(() => {
    const allFound = foundChars.every(char => char.found);

    if (allFound) {
      setFinishedGame(true);
    }
  }, [foundChars]);

  return (
    <main>
      <Timer isFinished={finishedGame} />
      <div className="image-container" >
        <img src={selectedGame.img_src} alt="" className="game-picture" onClick={(e) => handleImgClick(e)} />

        {finishedGame && 
          <>
            <div className="overlay"></div>
            <div className="victory-menu">
              <h2>You found all characters in {formatTime(timerContext.counter)}</h2>
              <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder="John5000" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
              </div>

              <button onClick={handleSavingTT}>Save top time</button>
            </div>
          </>
        }

        {isOpen && 
          <Popup positionX={currentPosition.x} positionY={currentPosition.y} handleSelect={handleSelectingCharacter} chars={foundChars} />
        }

        {foundChars.map((char, index) => 
          char.found ? (
            <div className="found-marker" key={index} style={{position: "absolute", top: `calc(${char.y * 100}%)`, left: `calc(${char.x * 100}%)`}}></div>
          ) : null
        )}

        {isWrong && <div className="wrong-msg">Wrong. Try again.</div>}
      </div>
    </main>
  )
}

export default Game