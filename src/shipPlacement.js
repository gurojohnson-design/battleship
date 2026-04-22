import { displayPlayerBoard } from "./display/display";

export function shipPlacement(activePlayer) {
    // display board, take click as startpoint for ship, prompt specific ship, create ship, after last ship start the game

    const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];

    // maybe a while loop that removes the first ship as activeShip, handles placing it, redefines ships[], and then does it again

    let activeShip = ships.shift();

    while (activeShip) {        
        let intro = document.createElement('div');
        intro.textContent = `${activePlayer.name}, place your ${activeShip}:`;
        intro.id = 'intro';
        document.getElementById('bodyContainer').append(intro);
        
        displayPlayerBoard(activePlayer);

        
    }



    displayPlayerBoard(activePlayer);



}