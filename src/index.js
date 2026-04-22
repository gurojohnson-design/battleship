import "./display/styles.css";
import { player } from "./classes/player.js";
import { gameDisplay, displayPlayerBoard, displayCpuBoard } from "./display/display.js";

// create players-- place ships-- display boards
// start button to kick off function
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const user = document.getElementById('name').value;

  if (!user) {
    return;
  } else {
    document.getElementById('formContainer').style.display = 'none';
    const user = document.getElementById('name').value;
    startGame(user);
  };
});

// define players globally for cross function access
let user;
let cpu;

function startGame(name) {
  // make players
  user = new player(`${name}`, "player");
  cpu = new player("cpu", "cpu");

  // show gameDisplay
  gameDisplay.style.display = 'grid';
  // display boards first for visual ship placement
  displayPlayerBoard(user);
  displayCpuBoard(cpu, user);

  // place ships
  // ship name, start index, direction 'lat' 'vert'
  user.gameboard.placeShip("aircraft", 0, "lat");
  user.gameboard.placeShip("battleship", 10, "lat");
  user.gameboard.placeShip("cruiser", 20, "lat");
  user.gameboard.placeShip("sub", 30, "lat");
  user.gameboard.placeShip("destroyer", 40, "lat");

  // place cpu ships
  cpu.gameboard.placeShip("aircraft", 0, "lat");
  cpu.gameboard.placeShip("battleship", 10, "lat");
  cpu.gameboard.placeShip("cruiser", 20, "lat");
  cpu.gameboard.placeShip("sub", 30, "lat");
  cpu.gameboard.placeShip("destroyer", 40, "lat");

  gameDisplay.textContent= '';
  // display boards with ships
  displayPlayerBoard(user);
  displayCpuBoard(cpu, user);
}
