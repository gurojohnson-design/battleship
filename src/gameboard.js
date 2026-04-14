import { ship } from "./ship.js";
export class gameboard {
    constructor() {
        this.board = Array.from({length: 100}, () => ({shipName: null, isHit: false}));
        this.ships = {};
        this.missedShots = [];
    }

    // need to write function for creating ship and placing it
    // create ship
    placeShip(name, start, dir) {
        if (name === 'aircraft') this.ships[name] = new ship(name, 5);
        if (name === 'battleship') this.ships[name] = new ship(name, 4);
        if (name === 'cruiser' || name === 'sub') this.ships[name] = new ship(name, 3);
        if (name === 'destroyer') this.ships[name] = new ship(name, 2);

        // 'row ends'
        let rowEnds = [];
        for (let i = 9; i < 100; i += 10) {
            rowEnds.push(i);
        }

        // place the ship in the right direction-- handle invalid placements
        let validPosition = false;
        if (dir === 'lat') {
            // check that it doesn't wrap rows
            for (let i = 0; i < rowEnds.length; i++) {
                if ((start + this.ships[name].lives) <= rowEnds[i] && start >= rowEnds[i] - 9) {
                    validPosition = true;
                    break;
                };
            }
            // check that it doesn't collide
            for (let i = 0; i < this.ships[name].lives; i++) {
                if (this.board[start + i].shipName) return validPosition = false;
            }
            // place ship
            if (validPosition) {
                for (let i = 0; i < this.ships[name].lives; i++) {
                    this.board[start + i].shipName = name;
                };
            };
        };

        if (dir === 'vert') {
            if (start + (this.ships[name].lives * 10) < 100) {
                validPosition = true;
                for (let i = 0; i < (this.ships[name].lives * 10); i += 10) {
                    if (this.board[start + i].shipName) {
                        return validPosition = false;
                    };
                };
                for (let i = 0; i < (this.ships[name].lives * 10); i += 10) {
                    this.board[start + i].shipName = name;
                    };
                };
                return validPosition;
            };
        }

        // receivesHit(coordinates) checks if shot is a hit/miss and logs missed shot or hit on ship
        receivesHit(coordinates) {
            if (this.board[coordinates].isHit === true) return false;
            this.board[coordinates].isHit = true;
            if (this.board[coordinates].shipName) {
                let target = this.ships[this.board[coordinates].shipName];
                return target.getsHit();
            } else this.missedShots.push(coordinates);
        }

    // note to self: needs to receiveHit() where coordinates are checked, and either missed shot is recorded or ship logs hit

    // note to self: function to check if ships have been sunk


}