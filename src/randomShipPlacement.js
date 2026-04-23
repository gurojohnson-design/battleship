export function randomShipPlacement(activePlayer) {
    let coordinates;
    let direction;
    const ships = ['carrier', 'battleship', 'cruiser', 'sub', 'destroyer'];
    let directionChoice = ['lat', 'vert'];

    ships.forEach((ship) => {
        let placed = false;
        while (!placed) {
            coordinates = Math.floor(Math.random() * 100);
            direction = Math.floor(Math.random() * 2);
            
            if (activePlayer.gameboard.isPlacementValid(ship, coordinates, directionChoice[direction])) {
                activePlayer.gameboard.placeShip(ship, coordinates, directionChoice[direction]);
                placed = true;
            };
        };
    });
}