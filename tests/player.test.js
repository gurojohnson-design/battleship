import { player } from "../src/classes/player.js";

const user = new player('King Arthur', 'player');
// test that a player object is made accurately
test('player name is accurate', () => {
    expect(user.name).toBe('King Arthur');
})

test('player type is accurate', () => {
    expect(user.type).toBe('player');
})


// randomCpuHit() returns the random shot location. test that the position it shot is marked 'hit' after the cpu shoots
test('cpu is able to generate hit', () => {
    expect(user.gameboard.board[user.randomCpuHit()].isHit).toBe(true);
})