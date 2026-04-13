export class ship {
    constructor(name, lives, ) {
        this.name = name;
        this.lives = lives;
        this.hits = 0;
        this.sunk = false;
        this.location = [];
    }

    getsHit() {
        this.hits++;
        this.isSunk();
        return;
    }
    
    isSunk() {
        if (this.hits === this.lives) this.sunk = true;
        return this.sunk;
    }
}