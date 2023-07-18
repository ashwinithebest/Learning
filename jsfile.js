const foo = function*() {
  yield 'a';
  yield 'b';
  yield 'c';
};
console.log(foo())
let str = '';
for (const val of foo()) {
  console.log(val)
  str = str + val;
}
console.log(str);
// Expected output: "abc"

let woo = foo()
let set1 = new Set(woo)
console.log(set1)
let map1 = new Map(woo)

const map = new Map(); // Create a new Map
map.set('hobby', 'cycling'); // Sets a key value pair

const foods = { dinner: 'Curry', lunch: 'Sandwich', breakfast: 'Eggs' }; // New Object
const normalfoods = {}; // New Object

map.set(normalfoods, foods); // Sets two objects as key value pair
console.log(map)
