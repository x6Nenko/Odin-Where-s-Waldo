import useData from "../hooks/useData"
import { useState } from "react";
import { DateTime } from "luxon";

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
      <h1>Leaderboard</h1>

      <section>
        <article className="game-card" onClick={() => handleSelect("Game1")}>
          <h2>Game 1</h2>
        </article>

        <article className="game-card" onClick={() => handleSelect("Game2")}>
          <h2>Game 2</h2>
        </article>
      </section>

      <section>
        {selectedTTs && selectedTTs.length > 0 ? 
          selectedTTs.map(tt => (
            <div key={tt._id}>{tt.time} {tt.username} {convertTime(tt.createdAt)}</div>
          ))
          :
          <p>There are no TTs yet</p>
        }
      </section>
    </main>
  )
}

export default Leaderboard