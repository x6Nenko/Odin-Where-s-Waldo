import { NavLink } from "react-router-dom";
import { gameData } from "../utils/gameData";
import { useState, useEffect } from "react";

const Home = () => {
  const [wokeup, setWokeup] = useState(false);
  const [preventGlitch, setPreventGlitch] = useState(true);

  function delay() {
    setTimeout(() => {
      setPreventGlitch(false);
    }, 500);
  }

  delay();

  // wake up servr
  useEffect(() => {
    async function wakeup() {
      try {
        const response = await fetch('http://localhost:3000/wakeup', {
          method: 'GET',
        });
  
        if (response.ok) {
          const responseData = await response.json(); // Extract JSON from the response
          setWokeup(true);
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

    wakeup();
  }, []);

  return (
    <main>
      <h1 className="title">Where&apos;s Waldo?</h1>

      {(wokeup === false && preventGlitch === false) &&
        <div className="wakeup">
          <h1>Wait (about 30 seconds), I&apos;ll wake up the server. Loading...</h1>
        </div>
      }

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