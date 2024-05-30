import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <h1>Welcome to Where&apos;s Waldo game. Choose your game and have fun!</h1>

      <section>
        <article className="game-card">
          <h2>Game name</h2>
          <NavLink to="game-1">Start</NavLink>
        </article>
      </section>
    </main>
  )
}

export default Home