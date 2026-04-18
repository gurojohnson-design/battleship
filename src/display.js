export const gameDisplay = document.createElement('div');
document.body.append(gameDisplay);

export function displayPlayerBoard(activePlayer) {

    const playerBoardContainer = document.createElement('div');
    playerBoardContainer.id = 'playerBoardContainer';

    playerBoardContainer.textContent = '';

    const board = activePlayer.gameboard.board;

    board.forEach((item, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `${index}`;
        playerBoardContainer.append(cell);

        if (item.isHit && item.shipName) cell.textContent = 'X on ship name';
        if (item.isHit && !item.shipName) cell.textContent = 'O missed shot';
        if (!item.isHit && item.shipName) cell.textContent = 'a ship is here';
        
    })
    gameDisplay.append(playerBoardContainer);
}

export function displayCpuBoard(cpu, player) {
    const cpuBoardContainer = document.createElement('div');
    cpuBoardContainer.id = 'cpuBoard';

    gameDisplay.append(cpuBoardContainer);

    cpuBoardContainer.textContent = '';

    const board = cpu.gameboard.board;

    board.forEach((item, index) => {
        // make the display
        const cpuCell = document.createElement('div');
        cpuCell.classList.add('cpuCell');
        cpuBoardContainer.append(cpuCell);

        // check condition and display accordingly
        if (item.isHit && item.shipName) cpuCell.textContent = 'X on ship name';
        if (item.isHit && !item.shipName) cpuCell.textContent = 'O missed shot';

        // add event listener per cell that has not been shot
        if (!item.isHit) {

            cpuCell.addEventListener('click', () => {
                // click and player shoots cpu
                cpu.gameboard.receivesHit(index);

                // re render cpu board
                displayCpuBoard(cpu, player);
                
                // check for gameover
                if (cpu.gameboard.allSunk()) {
                    alert('Game Over! Player Wins!');
                    return;
                }
                
                
                // cpu shoots player
                player.randomCpuHit();

                // re render player board
                displayPlayerBoard(player);

                // check for gameover
                if (player.gameboard.allSunk()) {
                    alert('Game Over! The CPU wins!');
                    return;
                }
                });
            };
        })
}
