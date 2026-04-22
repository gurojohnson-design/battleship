import { ship } from "./ship.js";
export class gameboard {
  constructor() {
    this.board = Array.from({ length: 100 }, () => ({
      shipName: null,
      isHit: false,
    }));
    this.ships = {};
    this.missedShots = [];
  }

  // need to write function for creating ship and placing it
  // create ship
  placeShip(name, start, dir = 'lat') {
    const livesMap = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    sub: 3,
    destroyer: 2,
    };
    const lives = livesMap[name];
    
    const validity = this.isPlacementValid(name, start, dir);
    if (dir === "lat") {
      // place ship
      if (validity) {
        for (let i = 0; i < lives; i++) {
          this.board[start + i].shipName = name;
        }
      }
    }

    if (dir === "vert") {
      if (validity) {
        for (let i = 0; i < lives * 10; i += 10) {
          this.board[start + i].shipName = name;
        }
      }
    }

    if (validity) {
      this.ships[name] = new ship(name, lives);
    }
  }

  // check placement validity
  isPlacementValid(name, start, dir) {
    const livesMap = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    sub: 3,
    destroyer: 2,
    };
    const lives = livesMap[name];

    // 'row ends'
    let rowEnds = [];
    for (let i = 9; i < 100; i += 10) {
      rowEnds.push(i);
    }
    // place the ship in the right direction-- handle invalid placements
    let validPosition = false;
    if (dir === "lat") {
      // check that it doesn't wrap rows
      for (let i = 0; i < rowEnds.length; i++) {
        if (start + lives <= rowEnds[i] && start >= rowEnds[i] - 9) {
          validPosition = true;
          break;
        }
      }
      // check that it doesn't collide
      for (let i = 0; i < lives; i++) {
        if (this.board[start + i].shipName) return (validPosition = false);
      }
      return validPosition;
    }

    if (dir === "vert") {
    if (start + lives * 10 < 100) {
      validPosition = true;
      for (let i = 0; i < lives * 10; i += 10) {
        if (this.board[start + i].shipName) {
          return (validPosition = false);
        }
      }
    }
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
    return true;
  }

  // allSunk() checks if all ships on board are sunk or not
  allSunk() {
    const shipsArray = Object.values(this.ships);
    return shipsArray.every((obj) => obj.sunk === true);
  }
}
