import Sword from './sword.js';

class Axe extends Sword {
  constructor() {
    super();
    this.name = 'Секира';
    this.attack = 27;
    this.durability = 800; 
    this.baseDurability = this.durability;
  }
}

export default Axe;
