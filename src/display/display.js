import { player } from "../classes/player";

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

    if (item.isHit && item.shipName) cell.textContent = "X on ship name";
    if (item.isHit && !item.shipName) cell.textContent = "O missed shot";
    if (!item.isHit && item.shipName) cell.textContent = "a ship is here";
  });
  gameDisplay.append(playerBoardContainer);
}

// recreate displayPlayerBoard() for placement purposes
  let currentShipIndex = 0;
  const ships = ['aircraft', 'battleship', 'cruiser', 'sub', 'destroyer'];
  let direction = 'lat';

export function displayPlacementBoard (activePlayer, cpu) {
  const placementBoardContainer = document.createElement("div");
  placementBoardContainer.id = "placementBoardContainer";

  placementBoardContainer.textContent = "";

  // axis flip button
  const axisBtn = document.createElement('button');
  axisBtn.id = 'axisBtn';
  
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

    if (item.shipName) cell.textContent = `${item.shipName}`;

    // add event listeners for placement

    cell.addEventListener('click', () => {
      activePlayer.gameboard.placeShip(ships[currentShipIndex], index, direction);
      currentShipIndex++;
      displayPlacementBoard(activePlayer, cpu);
    })

    cell.addEventListener('mouseenter', () => {
      if (activePlayer.gameboard.isPlacementValid(ships[currentShipIndex], index, direction)) {
        cell.style.backgroundColor = 'lightgreen';
      } else {
        cell.style.backgroundColor = 'lightcoral';
      }
    })

    cell.addEventListener('mouseleave', () => {
      cell.style.backgroundColor = 'lightgrey';
    })


  });
  gameDisplay.append(axisBtn, placementBoardContainer);

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
    if (item.isHit && item.shipName) cpuCell.textContent = "X on ship name";
    if (item.isHit && !item.shipName) cpuCell.textContent = "O missed shot";

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
          gameDisplay.style.display = 'none';
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
          gameDisplay.style.display = 'none';
          return;
        }
      });
    }
  });
}
