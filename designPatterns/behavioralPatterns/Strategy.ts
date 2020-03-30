// strategy patterns

class Character {
    weapon: Weapon;

    constructor() {
        this.weapon = new Knife();
    }

    setWeapon(weapon: Weapon): void {
        this.weapon = weapon;
    }

    attack(): void {
        this.weapon.attack();
    }
}

interface Weapon {
    attack(): void;
}

class Knife implements Weapon {
    attack(): void {
        console.log('[Attack by Knife!]');
    }
}

class Ax implements Weapon {
    attack(): void {
        console.log('[Attack by Ax!]');
    }
}

class Gun implements Weapon {
    attack(): void {
        console.log('[Attack by Gun!]');
    }
}

const eloyCharacter = new Character();
// default weapon is knife
eloyCharacter.attack();

// change weapon to Ax
eloyCharacter.setWeapon(new Ax());
eloyCharacter.attack();

// change weapon to gun
eloyCharacter.setWeapon(new Gun());
eloyCharacter.attack();
