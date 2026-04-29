import { randomShipPlacement } from "../randomShipPlacement.js";


export const gameDisplay = document.createElement("div");
gameDisplay.id = 'gameDisplay';
document.body.append(gameDisplay);

export function displayPlayerBoard(activePlayer) {
  const playerBoardContainer = document.createElement("div");
  playerBoardContainer.id = "playerBoardContainer";

  playerBoardContainer.textContent = "";

  const board = activePlayer.gameboard.board;

  board.forEach((item, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `${index}`;
    playerBoardContainer.append(cell);

    if (item.isHit && item.shipName) cell.classList.add('cell--hit');
    if (item.isHit && !item.shipName) cell.classList.add('cell--miss');
    if (item.shipName) {
      if (item.shipName === 'carrier') cell.classList.add('cell--carrier');
      if (item.shipName === 'battleship') cell.classList.add('cell--battleship');
      if (item.shipName === 'cruiser') cell.classList.add('cell--cruiser');
      if (item.shipName === 'sub') cell.classList.add('cell--sub');
      if (item.shipName === 'destroyer') cell.classList.add('cell--destroyer')
    }
  });
  gameDisplay.append(playerBoardContainer);
}

// recreate displayPlayerBoard() for placement purposes
let currentShipIndex = 0;
const ships = ['carrier', 'battleship', 'cruiser', 'sub', 'destroyer'];
let direction = 'lat';

export function displayPlacementBoard (activePlayer, cpu) {
  const placementBoardContainer = document.createElement("div");
  placementBoardContainer.id = "placementBoardContainer";

  placementBoardContainer.textContent = "";

  // axis flip button
  const axisBtn = document.createElement('button');
  axisBtn.id = 'axisBtn';
  axisBtn.textContent = 'Change Ship Direction'
  
  axisBtn.addEventListener('click', () => {
    if (direction === 'lat') {
      direction = 'vert';
    } else if (direction === 'vert') {
      direction = 'lat';
    }
  })

  const board = activePlayer.gameboard.board;

  board.forEach((item, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `${index}`;
    placementBoardContainer.append(cell);

    if (item.shipName) {
      if (item.shipName === 'carrier') cell.classList.add('cell--carrier');
      if (item.shipName === 'battleship') cell.classList.add('cell--battleship');
      if (item.shipName === 'cruiser') cell.classList.add('cell--cruiser');
      if (item.shipName === 'sub') cell.classList.add('cell--sub');
      if (item.shipName === 'destroyer') cell.classList.add('cell--destroyer')
    }
    // add event listeners for placement

    // event listener for ship placement
    cell.addEventListener('click', () => {
      if (activePlayer.gameboard.isPlacementValid(ships[currentShipIndex], index, direction)) {
        activePlayer.gameboard.placeShip(ships[currentShipIndex], index, direction);
        currentShipIndex++;
        }
        gameDisplay.textContent= '';
      displayPlacementBoard(activePlayer, cpu);
    })

    // highlight placement spot with valid or invalid
    cell.addEventListener('mouseenter', () => {
      const livesMap = {
        carrier: 5,
        battleship: 4,
        cruiser: 3,
        sub: 3,
        destroyer: 2,
      };
      const lives = livesMap[ships[currentShipIndex]];

      if (activePlayer.gameboard.isPlacementValid(ships[currentShipIndex], index, direction)) {
        if (direction === 'lat') {
          for (let i = 0; i < lives; i++) {
            let targetCell = document.getElementById(`${index + i}`);
            if (targetCell) targetCell.style.backgroundColor = 'lightgreen';
          }
        }
        if (direction === 'vert') {
          for (let i = 0; i < lives; i++) {
            let targetCell = document.getElementById(`${index + i * 10}`);
            if (targetCell) targetCell.style.backgroundColor = 'lightgreen';
          }
        }
      } else {
        if (direction === 'lat') {
          for (let i = 0; i < lives; i++) {
            let targetCell = document.getElementById(`${index + i}`);
            if (targetCell) targetCell.style.backgroundColor = 'lightcoral';
          }
        }
        if (direction === 'vert') {
          for (let i = 0; i < lives; i++) {
            let targetCell = document.getElementById(`${index + i * 10}`);
            if (targetCell) targetCell.style.backgroundColor = 'lightcoral';
          }
        }
      }
    })

    // remove highlighting
    cell.addEventListener('mouseleave', () => {
      const livesMap = {
        carrier: 5,
        battleship: 4,
        cruiser: 3,
        sub: 3,
        destroyer: 2,
      };
      const lives = livesMap[ships[currentShipIndex]];

        if (direction === 'lat') {
          for (let i = 0; i < lives; i++) {
            let targetCell = document.getElementById(`${index + i}`);
            if (targetCell) targetCell.style.backgroundColor = '';
          }
        }
        if (direction === 'vert') {
          for (let i = 0; i < lives; i++) {
            let targetCell = document.getElementById(`${index + i * 10}`);
            if (targetCell) targetCell.style.backgroundColor = '';
          }
        }
    })


  });

  let shipMessage = document.createElement('div');
  shipMessage.id = 'shipMessage';
  shipMessage.textContent = `Captain ${activePlayer.name}, place your ${ships[currentShipIndex]}`;
  
  const bodyContainer = document.getElementById('bodyContainer')



  gameDisplay.append(shipMessage, axisBtn, placementBoardContainer);

  if (currentShipIndex === 5) {
    gameDisplay.textContent = '';
    displayPlayerBoard(activePlayer);
    displayCpuBoard(cpu, activePlayer)
  }
}


// need cpu to randomly place it's own ships

export function displayCpuBoard(cpu, player) {
  const cpuBoardContainer = document.createElement("div");
  cpuBoardContainer.id = "cpuBoardContainer";

  gameDisplay.append(cpuBoardContainer);

  cpuBoardContainer.textContent = "";

  const board = cpu.gameboard.board;

  board.forEach((item, index) => {
    // make the display
    const cpuCell = document.createElement("div");
    cpuCell.classList.add("cpuCell");
    cpuBoardContainer.append(cpuCell);

    // check condition and display accordingly
    if (item.isHit && item.shipName) cpuCell.classList.add('cell--hit');
    if (item.isHit && !item.shipName) cpuCell.classList.add('cell--miss');
    if (!item.isHit) cpuCell.classList.add('cell--valid');

    // add event listener per cell that has not been shot
    if (!item.isHit) {
      cpuCell.addEventListener("click", () => {
        // click and player shoots cpu
        cpu.gameboard.receivesHit(index);

        //clear cpu board
        cpuBoardContainer.remove();

        // re render cpu board
        displayCpuBoard(cpu, player);

        // check for gameover
        if (cpu.gameboard.allSunk()) {
          alert("Game Over! Player Wins!");
          window.location.reload();
          // gameDisplay.style.display = 'none';
          return;
        }

        // cpu shoots player
        player.randomCpuHit();

        // clear player board
        document.getElementById('playerBoardContainer').remove();

        // re render player board
        displayPlayerBoard(player);

        // check for gameover
        if (player.gameboard.allSunk()) {
          alert("Game Over! The CPU wins!");
          window.location.reload();
          // gameDisplay.style.display = 'none';
          return;
        }
      });
    }
  });
}
