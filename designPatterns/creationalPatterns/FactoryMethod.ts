// factory method

abstract class Logistics {
    public abstract createTransport(): Transportation;

    public delivery(load: string): void {
        const transport = this.createTransport();
        console.log(`${load} will ${transport.deliver()}`);
    }
}

class RoadLogistics extends Logistics {
    public createTransport(): Transportation {
        return new Truck();
    }
}

class SeaLogistics extends Logistics {
    public createTransport(): Transportation {
        return new Ship();
    }
}

interface Transportation {
    deliver(): string;
}

class Truck implements Transportation {
    deliver(): string {
        return 'deliver through road';
    }
}

class Ship implements Transportation {
    deliver(): string {
        return 'deliver through sea';
    }
}

const wheel = 'wheel';
const roadLogistic = new RoadLogistics();
roadLogistic.delivery(wheel);

const car = 'car';
const seaLogistic = new SeaLogistics();
seaLogistic.delivery(car);

