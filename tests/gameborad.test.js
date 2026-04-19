import { gameboard } from "../src/classes/gameboard.js";
import { ship } from "../src/classes/ship.js";

test('new gameboard creates an array with length 100', () => {
    const play = new gameboard();
    expect(play.board.length).toBe(100);
})

test('new gameboard is full of objects', () => {
    const play = new gameboard();
    expect(play.board[0]).toEqual({shipName: null, isHit: false});
    expect(play.board[99]).toEqual({shipName: null, isHit: false});
})


test('gameboard can place ship', () => {
    const play = new gameboard();
    play.placeShip('sub', 3, 'lat');
    expect(play.board[3].shipName).toBe('sub');
    expect(play.board[4].shipName).toBe('sub');
    expect(play.board[5].shipName).toBe('sub');
})


test('locations track if they have been shot', () => {
    const play = new gameboard();

    play.receivesHit(3);
    expect(play.board[3].isHit).toBe(true);

    
})

test('another location accurately tracks shot', () => {
    const play = new gameboard();

    play.receivesHit(4);
    expect(play.board[4].isHit).toBe(true);
})

test('locations track if they have not been shot', () => {
    const play = new gameboard();

    expect(play.board[6].isHit).toBe(false);
})

test('allSunk() ignores unsunk ships', () => {
    const play = new gameboard();
    play.placeShip('sub', 3, 'lat');

    expect(play.allSunk()).toBe(false);
})

test('a sunk ship trips allSunk()', () => {
    const play = new gameboard();
        play.placeShip('sub', 3, 'lat');
        play.receivesHit(3);
        play.receivesHit(4);
        play.receivesHit(5);

    expect(play.allSunk()).toBe(true);
})







