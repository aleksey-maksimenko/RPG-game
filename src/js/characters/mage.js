import Player from './player.js';
import Staff from '../weapons/staff.js';
import Knife from '../weapons/knife.js';

class Mage extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 70;
    this.magic = 100;
    this.attack = 5;
    this.agility = 8;
    this.weapon = new Staff(); // основное оружие - посох
    this.description = "Маг";
    this.baseLife = this.life;
    this.baseMagic = this.magic;
  }
  takeDamage(damage) {
    let magicPercent = (this.magic / this.baseMagic) * 100.0;
    if (magicPercent > 50) { // если мана больше чем половина
      damage /= 2; // урон уменьшается в два раза
      this.magic -= 12;
      if (this.magic < 0) {
        //const remainingDamage=damage-this.magic; // остаток урона
        //damage=remainingDamage; 
        this.magic = 0; // устанавливаем ману в ноль
      }
    }
    super.takeDamage(damage);
  }
  
  
  checkWeapon() {
    if (!this.weapon.isBroken())
      return;
     if (this.weapon instanceof Staff) { 
       console.log(`${this.name} теряет посох и берёт нож`);
       this.weapon = new Knife();
     } else { 
       super.checkWeapon(); 
     } 
   }
}

export default Mage;
