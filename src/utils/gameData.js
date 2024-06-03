// GAME-1
import image1 from "../assets/gameone-min.jpeg"
import guts from "../assets/guts.png"
import griffith from "../assets/griffith.png"
import crash from "../assets/crash.png"
import image1_leaderboard from "../assets/game1-leaderboard.png"

// GAME-2
import image2 from "../assets/gametwo-min.jpg"
import rooster from "../assets/rooster.png"
import doggy from "../assets/doggy.png"
import mms from "../assets/mms.png"
import image2_leaderboard from "../assets/game2-leaderboard.png"

export const gameData = [
  {
    game_route: "/game-1",
    game_name: "Game1",
    img_src: image1,
    img_leaderboard: image1_leaderboard,
    chars: [
      {
        name: "Guts",
        found: false,
        img: guts,
        // x and y where to place marker when char was found
        x: 0.4724119810825013,
        y: 0.8827252419955324,
      },
      {
        name: "Griffith",
        found: false,
        img: griffith,
        x: 0.03205465055176038,
        y: 0.4571854058078928,
      },
      {
        name: "Crash",
        found: false,
        img: crash,
        x: 0.4976353126642144,
        y: 0.5692479523454952,
      },
    ]
  },
  {
    game_route: "/game-2",
    game_name: "Game2",
    img_src: image2,
    img_leaderboard: image2_leaderboard,
    chars: [
      {
        name: "Doggy",
        found: false,
        img: doggy,
        // x and y where to place marker when char was found
        x: 0.5430769230769231,
        y: 0.3831273508866201,
      },
      {
        name: "Rooster",
        found: false,
        img: rooster,
        x: 0.44384615384615383,
        y: 0.6657710908113917,
      },
      {
        name: "MandMs",
        found: false,
        img: mms,
        x: 0.1123076923076923,
        y: 0.7205803331542182,
      },
    ]
  },
]