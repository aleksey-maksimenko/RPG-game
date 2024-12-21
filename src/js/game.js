import Weapon from './weapons/weapon.js';
import Player from './characters/player.js';
import Warrior from './characters/warrior.js';
import Archer from './characters/archer.js';
import Mage from './characters/mage.js';
import Dwarf from './characters/dwarf.js';
import Crossbowman from './characters/crossbowman.js';
import Demiurge from './characters/demiurge.js';

function play(players) {
   while (players.filter(player => !player.isDead()).length > 1) {
     for (let player of players) {
       if (!player.isDead()) {
         player.turn(players);
       }
     }
   }

   const winner = players.find(player => !player.isDead());
   console.log(`Победитель: ${winner.name}, оставшаяся жизнь: ${winner.life}`);
}

export { play };
