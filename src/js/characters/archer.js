import Player from './player.js';
import Bow from '../weapons/bow.js';
import Knife from '../weapons/knife.js';

class Archer extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 35;
    this.attack = 5;
    this.agility = 10;
    this.weapon = new Bow(); // основное оружие - лук
    this.description = "Лучник";
    this.baseLife = this.life;
    this.baseMagic = this.magic;
  }
  getDamage(distance) {
    const weaponDamage = this.weapon.getDamage();
    const weaponRange = this.weapon.range;
    if (distance > weaponRange) {
      return 0;
    }
    return (this.attack + weaponDamage) * this.getLuck() * distance / weaponRange;
  }
  
  checkWeapon() {
    if (!this.weapon.isBroken())
      return;
     if (this.weapon instanceof Bow) {
       console.log(`${this.name} теряет лук и берёт нож.`);
       this.weapon = new Knife();
     } else {
       super.checkWeapon();
     }
   }
}

export default Archer;
