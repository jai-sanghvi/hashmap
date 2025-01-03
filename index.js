import { HashMap } from "./hash-map.js";

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(`length before overload & overwriting: ${test.table.length}`);

test.set('moon', 'silver')

console.log(`length after overload: ${test.table.length}`);

test.set('jacket', 'bluew')
test.set('lion', 'goldenw')
test.set('kite', 'pinkw')

console.log(`length after overwriting: ${test.table.length}`);
