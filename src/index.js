import "./display/styles.css";
import { player } from "./classes/player.js";
import { gameDisplay, displayPlacementBoard } from "./display/display.js";


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
  // show gameDisplay
  gameDisplay.style.display = 'grid';

  user = new player(`${name}`, 'player');
  cpu = new player('cpu', 'cpu');


  // make player, handle ship placement, transition game
  displayPlacementBoard(user, cpu);
}
