import { gameDisplay, displayPlayerBoard, displayCpuBoard } from "./display.js";
import { player } from "./player.js";

// create players-- place ships-- display boards
// start button to kick off function
const startBtn = document.createElement("button");
startBtn.id = "startBtn";
gameDisplay.append(startBtn);

startBtn.addEventListener("click", startGame);

export function startGame() {
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

  // display boards with ships
  displayPlayerBoard(user);
  displayCpuBoard(cpu, user);
}
