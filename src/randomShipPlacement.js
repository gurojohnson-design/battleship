export function randomShipPlacement(activePlayer) {
    let coordinates;
    let direction;
    const ships = ['carrier', 'battleship', 'cruiser', 'sub', 'destroyer'];
    let directionChoice = ['lat', 'vert'];

    ships.forEach((ship) => {
        // for each ship were going to generate a random coordinate and choose a random direction and place ship at that coordinate and direction on the activeplayer gameboard
        coordinates = Math.floor(Math.random() * 100);
        direction = Math.floor(Math.random() * 2);

        activePlayer.gameboard.placeShip(ship, coordinates, directionChoice[direction]);
    })

}