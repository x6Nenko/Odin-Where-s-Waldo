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
  const selectedGame = gameData.find(gameEntry => gameEntry.game_route === location.pathname);

  const [isOpen, setIsOpen] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [finishedGame, setFinishedGame] = useState(false);
  const [username, setUsername] = useState("");
  const [currentPosition, setCurrentPosition] = useState({});
  const [foundChars, setFoundChars] = useState(selectedGame.chars);
  const [serverTimerResult, setServerTimerResult] = useState();

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
      toptime_client: formatTime(timerContext.counter),
      toptime_server: serverTimerResult,
      game: selectedGame.game_name,
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

  // finish game, end timer
  useEffect(() => {
    const allFound = foundChars.every(char => char.found);
    async function fetchTimer() {
      try {
        const response = await fetch('http://localhost:3000/end', {
          method: 'GET',
        });
  
        if (response.ok) {
          const responseData = await response.json(); // Extract JSON from the response
          setServerTimerResult(responseData.difference);
          console.log(responseData);
        } else {
          const responseData = await response.json(); // Extract JSON from the response
          console.error('Something went wrong:', responseData);
        }
      } catch (error) {
        console.error('Something went wrong:', error);
        // Handle other error cases
      }
    }

    if (allFound) {
      setFinishedGame(true);
      fetchTimer();
    }
  }, [foundChars]);

  // start timer
  useEffect(() => {
    async function fetchTimer() {
      try {
        const response = await fetch('http://localhost:3000/start', {
          method: 'GET',
        });
  
        if (response.ok) {
          const responseData = await response.json(); // Extract JSON from the response
          console.log(responseData);
        } else {
          const responseData = await response.json(); // Extract JSON from the response
          console.error('Something went wrong:', responseData);
        }
      } catch (error) {
        console.error('Something went wrong:', error);
        // Handle other error cases
      }
    }

    fetchTimer();
  }, []);

  return (
    <main>
      <div className="game-header">
        <div className="placeholder-container">
          <div className="placeholder-circle"></div>
          <div className="placeholder-circle circle-200"></div>
          <div className="placeholder-circle circle-300"></div>
        </div>

        <Timer isFinished={finishedGame} />

        <div className="chars-preview-game-container">
          {foundChars.map((char, index) => (
            char.found ? 
            <div key={index} className="game-char-preview-found-container"> 	
              <span className="checkmark">&#x2713;</span>
              <img src={char.img} className="game-char-preview game-char-preview-found" />
            </div>
            :
            <img src={char.img} key={index} className="game-char-preview" />
          ))}
        </div>
      </div>
      <div className="image-container" >
        <img src={selectedGame.img_src} alt="" className="game-picture" onClick={(e) => handleImgClick(e)} />

        {finishedGame && 
          <>
            <div className="overlay"></div>
            <div className="victory-menu">
              <h2>Well done. You did it!</h2>

              <div className="result-time-container">
                <p>Elapsed client time:</p>
                <span className="result-time">{formatTime(timerContext.counter)}</span>
              </div>

              <div className="result-time-container">
                <p>Elapsed server time:</p>
                <span className="result-time">{serverTimerResult}</span>
              </div>

              <hr className="victory-menu-hr" />

              <div className="input-container">
                <label className="username-label" htmlFor="username">Username:</label>
                <input className="username-input" type="text" name="username" id="username" placeholder="John5000" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
              </div>

              <button onClick={handleSavingTT} className="save-btn">Save top time</button>
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