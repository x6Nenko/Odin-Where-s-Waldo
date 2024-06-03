import useData from "../hooks/useData"
import { useState } from "react";
import { DateTime } from "luxon";
import { gameData } from "../utils/gameData";
import { timeStringToMilliseconds } from "../utils/formatTime";

const Leaderboard = () => {
  const allTTs = useData("https://rowan-gifted-citrine.glitch.me/toptime");
  const [activeGame, setActiveGame] = useState("Game1");

  const selectedTTs = allTTs && allTTs.toptimes.filter(tt => tt.game.name === activeGame).sort((a, b) => {
    const timeA = timeStringToMilliseconds(a.time_server);
    const timeB = timeStringToMilliseconds(b.time_server);
    return timeA - timeB;
  });

  function convertTime(time) {
    const createdAtDate = new Date(time);
    return DateTime.fromJSDate(createdAtDate).setLocale('en').toLocaleString(DateTime.DATE_MED);
  }

  // console.log(allTTs && allTTs.toptimes);

  function handleSelect(game) {
    setActiveGame(game)
  }

  return (
    <main>
      <h1 className="title">Leaderboard</h1>

      <section className="cards-container">
        {gameData.map((game, index) => (
          <article 
            key={index} 
            className={`game-card game-leaderboard-card ${game.game_name === activeGame ? "game-card-active" : ""}`}
            onClick={() => handleSelect(game.game_name)}
          >
            <div className="leaderboard-img">
              <img src={game.img_leaderboard} alt="" />
            </div>
            <h2>Game-{index + 1}</h2>
          </article>
        ))}
      </section>

      <section className="tts-container">
        {(selectedTTs && selectedTTs.length > 0) && 
          <div className="row">
            <div className="col">
              #
            </div>
            
            <div className="col">
              Username
            </div>

            <div className="col">
              Server time
            </div>

            <div className="col">
              Client time
            </div>

            <div className="col">
              Date
            </div>
          </div>
        }
  
        {selectedTTs && selectedTTs.length > 0 ? 
          selectedTTs.map((tt, index) => (
            <div className="row" key={tt._id}>
              <div className="col">
                {index+1 <= 3 ? 
                  <span className="champ">{index+1}</span>
                  :
                  index+1
                }
              </div>
              
              <div className="col">
                {tt.username}
              </div>

              <div className="col">
                {tt.time_server}
              </div>

              <div className="col">
                {tt.time_client}
              </div>

              <div className="col">
                {convertTime(tt.createdAt)}
              </div>
            </div>
          ))
          :
          <p className="no-tts">There are no TTs yet</p>
        }
      </section>
    </main>
  )
}

export default Leaderboard