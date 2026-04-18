// test for ship objects-- given name and number of lives, a ship object is returned with the correct info
import { ship } from "../src/classes/ship.js";

test('create ship object', () => {
    const sub = new ship('sub', 3);
    
    // created accurate object
    expect(sub).toBeInstanceOf(ship);
    expect(sub.name).toBe('sub');
    expect(sub.lives).toBe(3);   
})

test('ship tracks hits', () => {
    const sub = new ship('sub', 3);

    // object can be hit
    sub.getsHit();
    expect(sub.hits).toBe(1);    
})

test('ship updates "sunk"', () => {
    const sub = new ship('sub', 3);

    // ship gets sunk
    sub.getsHit();
    sub.getsHit();
    sub.getsHit();

    expect(sub.sunk).toBe(true);
})