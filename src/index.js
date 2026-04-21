import "./display/styles.css";
import { player } from "./classes/player.js";
import { gameDisplay, displayPlayerBoard, displayCpuBoard } from "./display/display.js";

// create players-- place ships-- display boards
// start button to kick off function
const startBtn = document.createElement("button");
startBtn.id = "startBtn";
startBtn.textContent = 'Start Game'
document.body.append(startBtn);

startBtn.addEventListener("click", startGame);

function startGame() {
  // make players
  const user = new player("user", "player");
  const cpu = new player("cpu", "cpu");

  // display boards first for visual ship placement
  displayPlayerBoard(user);
  displayCpuBoard(cpu, user);

  // place ships
  // ship name, start index, direction 'lat' 'vert'
  user.gameboard.placeShip("aircraft", 1, "lat");
  user.gameboard.placeShip("battleship", 10, "lat");
  user.gameboard.placeShip("cruiser", 20, "lat");
  user.gameboard.placeShip("sub", 30, "lat");
  user.gameboard.placeShip("destroyer", 40, "lat");

  // place cpu ships
  cpu.gameboard.placeShip("aircraft", 1, "lat");
  cpu.gameboard.placeShip("battleship", 10, "lat");
  cpu.gameboard.placeShip("cruiser", 20, "lat");
  cpu.gameboard.placeShip("sub", 30, "lat");
  cpu.gameboard.placeShip("destroyer", 40, "lat");

  gameDisplay.textContent= '';
  // display boards with ships
  displayPlayerBoard(user);
  displayCpuBoard(cpu, user);
}
