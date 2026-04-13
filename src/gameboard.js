import { ship } from "./ship.js";
export class gameboard {
    constructor() {
        this.board = new Array(100).fill({shipName: null, isHit: false});
    }

    // need to write function for creating ship and placing it
    // create ship
    placeShip(name, start, dir) {
        let vessel;
        if (name === 'aircraft') vessel = new ship(name, 5);
        if (name === 'battleship') vessel = new ship(name, 4);
        if (name === 'cruiser' || name === 'sub') vessel = new ship(name, 3);
        if (name === 'destroyer') vessel = new ship(name, 2);

        // 'row ends'
        let rowEnds = [];
        for (let i = 9; i < 100; i += 10) {
            rowEnds.push(i);
        }

        // place the ship in the right direction-- handle invalid placements
        if (dir === 'lat') {
            for (let i = 0; i < rowEnds.length; i++) {
                if (start < rowEnds[i] && (start + vessel.lives) <= rowEnds[i]) {
                    for (let i = 0; i < vessel.lives; i++) {
                        this.board[start + i].shipName = name;
                       };
                    };
                };
            }
        if (dir === 'vert') {
            if (start + (vessel.lives * 10) < 100) {
                for (let i = 0; i < vessel.lives; i += 10) {
                    this.board[start + i].shipName = name;
                };
            };
        }


        // note for Claude: i stopped this function here and decided to get assistance from you before i went too far down a path that didn't feel right
    }
    // note to self: needs to receiveHit() where coordinates are checked, and either missed shot is recorded or ship logs hit

    // note to self: function to check if ships have been sunk


}