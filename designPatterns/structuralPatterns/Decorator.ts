// Decorator

interface Road {
    draw(): void;
}


class RoadDisplay implements Road {
    public draw(): void {
        console.log('[draw road]');
    }
}

class RoadDecorator implements Road {
    protected road: Road;

    constructor(road: Road) {
        this.road = road;
    }

    public draw(): void {
        this.road.draw();
    }
}

class RoadDisplayWithLane extends RoadDecorator {
    public draw(): void {
        super.draw();
        this.drawLane();
    }

    private drawLane(): void {
        console.log('[draw lane]');
    }
}

class RoadDisplayWithTraffic extends RoadDecorator {
    public draw(): void {
        super.draw();
        this.drawTraffic();
    }

    private drawTraffic(): void {
        console.log('[draw traffic]');
    }
}

function clientCode(road: Road) {
    // ...

    road.draw();

    // ...
}

const simple = new RoadDisplay();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');

const decorator1 = new RoadDisplayWithLane(simple);
const decorator2 = new RoadDisplayWithTraffic(decorator1);
console.log('Client: Now I\'ve got a decorated component:');
clientCode(decorator2);
