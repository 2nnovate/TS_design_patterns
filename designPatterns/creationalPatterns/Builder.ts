// builder

class Computer {
    cpu: string;
    ram: string;
    storage: string;

    public getDescription(): void {
        console.log(`this computer has ${this.cpu} cpu, ${this.ram} ram and ${this.storage} storage.`);
    }
}

class ComputerManual {
    cpu: string;
    ram: string;
    storage: string;

    public getDescription(): void {
        console.log(`hello, thanks for purchase this model. here's this computer's spec. cpu is ${this.cpu}, ram is ${this.ram} and storage is ${this.storage}.`);
    }
}

interface Builder {
    reset(): void;
    setCpu(cpu: string): void;
    setRam(ram: string): void;
    setStorage(storage: string): void;
}

class ComputerBuilder implements Builder {
    private computer: Computer;

    constructor() {
        this.reset();
    }

    reset(): void {
        this.computer = new Computer();
    }

    setCpu(cpu: string): void {
        this.computer.cpu = cpu;
    }

    setRam(ram: string): void {
        this.computer.ram = ram;
    }

    setStorage(storage: string): void {
        this.computer.storage = storage;
    }

    getProduct(): Computer {
        const computer = this.computer;
        this.reset();
        return computer;
    }
}

class ComputerManualBuilder implements Builder {
    private computerManual: ComputerManual;

    constructor() {
        this.reset();
    }

    reset(): void {
        this.computerManual = new ComputerManual();
    }

    setCpu(cpu: string): void {
        this.computerManual.cpu = cpu;
    }

    setRam(ram: string): void {
        this.computerManual.ram = ram;
    }

    setStorage(storage: string): void {
        this.computerManual.storage = storage;
    }

    getProduct(): ComputerManual {
        const computerManual = this.computerManual;
        this.reset();
        return computerManual;
    }
}

class Director {
    private builder: ComputerBuilder | ComputerManualBuilder;

    public setBuilder(builder: ComputerBuilder | ComputerManualBuilder): void {
        this.builder = builder;
    }

    public makeMacbookAir(): void {
        this.builder.setCpu('i5');
        this.builder.setRam('4g');
        this.builder.setStorage('256g');
    }

    public makeMacbookPro(): void {
        this.builder.setCpu('i7');
        this.builder.setRam('16g');
        this.builder.setStorage('512g');
    }
}

// client code
const director = new Director();

const computerBuilder = new ComputerBuilder();
const computerManualBuilder = new ComputerManualBuilder();

// macbook air
director.setBuilder(computerBuilder);
director.makeMacbookAir();
const macbookAir = computerBuilder.getProduct();
macbookAir.getDescription();

// macbook air manual
director.setBuilder(computerManualBuilder);
director.makeMacbookAir();
const macbookAirManual = computerManualBuilder.getProduct();
macbookAirManual.getDescription();

// macbook pro
director.setBuilder(computerBuilder);
director.makeMacbookPro();
const macbookPro = computerBuilder.getProduct();
macbookPro.getDescription();

// macbook pro manual
director.setBuilder(computerManualBuilder);
director.makeMacbookPro();
const macbookProManual = computerManualBuilder.getProduct();
macbookProManual.getDescription();

