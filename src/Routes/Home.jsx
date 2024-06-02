import { NavLink } from "react-router-dom";
import { gameData } from "../utils/gameData";

const Home = () => {
  return (
    <main>
      <h1 className="title">Where&apos;s Waldo?</h1>

      <section className="cards-container">
        {gameData.map((game, index) => (
          <article className="game-card" key={index}>
            {/* <div className="demo-img">
              <img src={game.img_src} alt="" />
            </div> */}
            {/* <div className="char-previews-container">
              {game.chars.map((char, index) => (
                <img src={char.img} key={index} className="char-preview" />
              ))}
            </div> */}
            <div className="leaderboard-img">
              <img src={game.img_leaderboard} alt="" />
            </div>
            <h2>Game-{index + 1}</h2>
            <NavLink to={game.game_route} className="start-btn">START</NavLink>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Home