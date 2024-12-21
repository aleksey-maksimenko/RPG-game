import './css/style.css';
import './js/game.js';
import Warrior from './js/characters/warrior.js';
import Archer from './js/characters/archer.js';
import Mage from './js/characters/mage.js';
import Dwarf from './js/characters/dwarf.js';
import Crossbowman from './js/characters/crossbowman.js';
import Demiurge from './js/characters/demiurge.js';
import { play } from './js/game.js';

console.log('Index module loaded. Hello world!');


console.log('Creating warrior...');
let player1 = new Warrior(0, "Алёша Попович");
console.log('Warrior created');
let player2 = new Archer(6, "Леголас");
let player3 = new Mage(4, "Гендальф");
let player4 = new Demiurge(8, "Истас")
let player5 = new Dwarf(11, "Гримли")
let player6 = new Crossbowman(13, "Лукарий")

console.log('Characters were created');

let players = [player1, player2, player3, player4, player5, player6];
play(players); 

