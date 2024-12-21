import Arm from '../weapons/arm.js';
import Knife from '../weapons/knife.js';


class Player {
  constructor(position, name) {
    this.life = 100;
    this.magic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.weapon = new Arm();
    this.position = position;
    this.name = name;
    this.baseLife = this.life;
    this.baseMagic = this.magic;
  }

  getLuck() {
    const randomNumber = Math.floor(Math.random() * 101);
    return (randomNumber + this.luck) / 100;
  }

  getDamage(distance) {
    const weaponDamage = this.weapon.getDamage();
    if (distance > this.weapon.range) {
      return 0;
    }
    let resultDmg = (this.attack + weaponDamage) * this.getLuck() / distance;
    return resultDmg;
  }

  takeDamage(damage) {
    this.life -= damage;
    console.log(`${this.name} получил ${damage} урона`);
    if (this.life < 0) {
      this.life = 0;
      console.log(`${this.name} достигает нулевой отметки здоровья`);
    }
  }

  isDead() {
    return this.life === 0; 
  }

  moveLeft(distance) {
    const moveDistance = Math.min(distance, this.speed);
    this.position -= moveDistance;
  }

  moveRight(distance) {
    const moveDistance = Math.min(distance, this.speed);
    this.position += moveDistance;
  }

  isAttackBlocked() {
    return this.getLuck() > (100 - this.luck) / 100;
  }

  dodged() {
    return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
  }

  takeAttack(damage) {
    if (this.isAttackBlocked()) {
      this.weapon.takeDamage(damage);
      console.log(`${this.name} заблокировал атаку, урон по оружию: ${damage}`);
      return;
    }
    
    if (this.dodged()) {
      console.log(`${this.name} уклонился от атаки`);
      return;
    }
    
    this.takeDamage(damage);
    
  }
  
  checkWeapon() {
    if (!this.weapon.isBroken())
      return;
    if (this.weapon instanceof Arm) {
      return; 
    } else if (this.weapon instanceof Knife) {
      console.log(`${this.name} теряет нож и остается с голыми руками`);
      this.weapon = new Arm(); // заменяем нож на руки
      return;
    }
  }
  
  tryAttack(enemy) {
    let damage = 0;
    let distance = 0;
    console.log(`${this.name} (клетка ${this.position}) пробует атаковать ${enemy.name} (клетка ${enemy.position})`);
    // если на одной клетке
    if (this.position === enemy.position) {
      enemy.moveRight(1);
      console.log(`${enemy.name} отлетает на позицию ${enemy.position} и получит удвоенный урон от ${this.name}`);
      damage = this.getDamage(1); // урон в соседнюю клетку
      damage *= 2; //удвоенный урон
    }
    else {
     distance = Math.abs(this.position - enemy.position);
     if (distance > this.weapon.range) {
       console.log(`${this.name} с радиусом атаки ${this.weapon.range} не достаёт до ${enemy.name} на расстоянии ${distance}`);
       return;
     }
     damage = this.getDamage(distance);
    }
    console.log(`рассчитан урон: ${damage}`);
    console.log(`${this.name} атакует ${enemy.name} на ${damage} урона`);
    
    this.weapon.takeDamage(10 * this.getLuck()); // износ оружия
    enemy.takeAttack(damage);
    this.checkWeapon();
    enemy.checkWeapon();
  }

  chooseEnemy(players) {
    let aliveEnemies = players.filter(player => player !== this && !player.isDead());
    
    if (aliveEnemies.length === 0) {
      return null; 
    }

    let targetEnemy = aliveEnemies[0];
    
    for (let i = 1; i < aliveEnemies.length; i++) {
      if (aliveEnemies[i].life < targetEnemy.life) {
        targetEnemy = aliveEnemies[i];
      }
    }

    return targetEnemy;
  }

  moveToEnemy(enemy) {
    if (!enemy || enemy.isDead()) {
      console.log(`${this.name} не может двигаться к мёртвому врагу`);
      return;
    }
    
    if (this.position - enemy.position < -1) {
      let distanceToMove = Math.min(enemy.position - this.position - 1, this.speed);
      console.log(`${this.name} (${this.position}) движется вправо к ${enemy.name} (${enemy.position})  на ${distanceToMove}`);
      this.moveRight(distanceToMove);
    } else if (this.position - enemy.position > 1) {
      let distanceToMove = Math.min(this.position - enemy.position - 1, this.speed);
      console.log(`${this.name} (${this.position}) движется влево к ${enemy.name} (${enemy.position}) на ${distanceToMove}`);
      this.moveLeft(distanceToMove);
    } else {
      console.log(`${this.name} (${this.position}) уже рядом с ${enemy.name} (${enemy.position})`);
    }
  }

  turn(players) {
    console.log(`\nХодит ${this.name} (уровень здоровья ${this.life})`);
    const enemy = this.chooseEnemy(players);
    
    if (enemy) {
      console.log(`Выбран противник ${enemy.name} (уровень здоровья ${enemy.life})`);
      this.moveToEnemy(enemy);
      this.tryAttack(enemy);
      
      if (enemy.isDead()) {
        console.log(`${enemy.name} пал в бою после атаки ${this.name}`);
      }
    } else {
      console.log(`${this.name} не нашёл врагов для атаки`);
    }
  }  
}  

export default Player;
