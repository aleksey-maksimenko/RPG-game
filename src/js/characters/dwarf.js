import Warrior from './warrior.js';
import Axe from '../weapons/axe.js';
import Knife from '../weapons/knife.js';

class Dwarf extends Warrior {
  constructor(position, name) {
    super(position, name);
    this.description = "Гном";
    this.life = 130;
    this.attack = 15;
    this.luck = 20;
    this.weapon = new Axe();
    this.baseLife = this.life;
    this.baseMagic = this.magic;
    this.timesDamaged = 0; //количество полученных ударов
  }
  takeDamage(damage) {
    this.timesDamaged++; //+1 удар
    if (this.getLuck() > 0.5 && timesDamaged % 6 == 0) {
      damage /= 2; // уменьшение урона в два раза
    }
    super.takeDamage(damage);
  }
}


export default Dwarf;
