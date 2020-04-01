// Adapter pattern

class RoundHole {
    radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    public getRadius(): number {
        return this.radius;
    }

    public fits(peg: RoundPeg): boolean {
        const isFit = this.getRadius() >= peg.getRadius();
        console.log('[isFit]', isFit);

        return isFit;
    }
}

class RoundPeg {
    radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    public getRadius(): number {
        return this.radius;
    }
}

class SquarePeg {
    width: number;

    constructor(width: number) {
        this.width = width;
    }

    public getWidth(): number {
        return this.width;
    }
}

// Adapter
class SquarePegAdapter extends RoundHole {
    peg: SquarePeg;

    constructor(peg: SquarePeg) {
        super(peg.getWidth());
        this.peg = peg;
    }

    public getRadius(): number {
        return this.peg.getWidth() * Math.sqrt(2) / 2;
    }
}

const hole = new RoundHole(5);
const roundPeg = new RoundPeg(5);
hole.fits(roundPeg);

const smallSquarePeg = new SquarePeg(5);
const largeSquarePeg = new SquarePeg(10);
// hole.fits(smallSquarePeg); // can't compile cuz hole fits method receive only RoundPeg

const smallSquarePegAdapter = new SquarePegAdapter(smallSquarePeg);
hole.fits(smallSquarePegAdapter);

const largeSquarePegAdapter = new SquarePegAdapter(largeSquarePeg);
hole.fits(largeSquarePegAdapter);


