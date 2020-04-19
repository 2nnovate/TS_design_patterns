// abstract factory

interface GUIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
}

class MacGUIFactory implements GUIFactory {
    createButton(): Button {
        console.log('(button)');
        return new MacButton();
    }

    createCheckbox(): Checkbox {
        console.log('(checkbox)');
        return new MacCheckbox();
    }
}

class WinGUIFactory implements GUIFactory {
    createButton(): Button {
        console.log('[button]');
        return new WinButton();
    }

    createCheckbox(): Checkbox {
        console.log('[checkbox]');
        return new WinCheckbox();
    }
}

interface Button {
    onClick(): void;
}

class MacButton implements Button {
    onClick(): void {
        console.log('mac button is clicked');
    }
}

class WinButton implements Button {
    onClick(): void {
        console.log('window button is clicked');
    }
}

interface Checkbox {
    onCheck(): void;
}

class MacCheckbox implements Checkbox {
    onCheck(): void {
        console.log('mac checkbox is checked');
    }
}

class WinCheckbox implements Checkbox {
    onCheck(): void {
        console.log('mac checkbox is checked');
    }
}

class Application {
    private factory: GUIFactory;
    private button: Button;
    private checkbox: Checkbox;

    constructor(factory: GUIFactory) {
        this.factory = factory;
    }

    createButton(): void {
        this.button = this.factory.createButton();
    }

    onClickButton(): void {
        this.button.onClick();
    }

    createCheckbox(): void {
        this.checkbox = this.factory.createCheckbox();
    }

    onCheckCheckbox(): void {
        this.checkbox.onCheck();
    }
}

// mac os
const macApplication = new Application(new MacGUIFactory());
macApplication.createButton();
macApplication.onClickButton();

macApplication.createCheckbox();
macApplication.onCheckCheckbox();

// window os
const windowApplication = new Application(new WinGUIFactory());
windowApplication.createButton();
windowApplication.onClickButton();

windowApplication.createCheckbox();
windowApplication.onCheckCheckbox();
