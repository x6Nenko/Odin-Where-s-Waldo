import useData from "../hooks/useData"
import { useState } from "react";
import { DateTime } from "luxon";
import { gameData } from "../utils/gameData";

const Leaderboard = () => {
  const allTTs = useData("http://localhost:3000/toptime");
  const [activeGame, setActiveGame] = useState("Game1");

  const selectedTTs = allTTs && allTTs.toptimes.filter(tt => tt.game.name === activeGame);

  function convertTime(time) {
    const createdAtDate = new Date(time);
    return DateTime.fromJSDate(createdAtDate).setLocale('en').toLocaleString(DateTime.DATE_MED);
  }

  console.log(allTTs && allTTs.toptimes);

  function handleSelect(game) {
    setActiveGame(game)
  }

  return (
    <main>
      <h1 className="title">Leaderboard</h1>

      <section className="cards-container">
        {gameData.map((game, index) => (
          <article key={index} className="game-card" onClick={() => handleSelect(game.game_name)}>
            <div className="leaderboard-img">
              <img src={game.img_leaderboard} alt="" />
            </div>
            <h2>Game-{index + 1}</h2>
          </article>
        ))}
      </section>

      <section>
        {selectedTTs && selectedTTs.length > 0 ? 
          selectedTTs.map(tt => (
            <div key={tt._id}>Server: {tt.time_server} Client: {tt.time_client} {tt.username} {convertTime(tt.createdAt)}</div>
          ))
          :
          <p>There are no TTs yet</p>
        }
      </section>
    </main>
  )
}

export default Leaderboard