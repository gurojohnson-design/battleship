import { gameboard } from "./gameboard.js";
export class player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.gameboard = new gameboard();
  }

  // random attacks for cpu
  // runs receivesHit(coordinate) where coordinate is random number from 1-100 and if receivesHit() returns false it picks a new number
  randomCpuHit() {
    let randomIndex = Math.floor(Math.random() * 100);

    while (!this.gameboard.receivesHit(randomIndex)) {
      randomIndex = Math.floor(Math.random() * 100);
    }
  }
}
