// Memento pattern

class Editor {
    private text: string;

    public getText(): string {
        return this.text;
    }

    public setText(text: string): void {
        this.text = text;
    }

    public save(): Snapshot {
        return new ConcreteSnapShot(this.text);
    }

    public restore(snapshot: Snapshot): void {
        this.text = snapshot.getText();
    }
}

interface Snapshot {
    getText(): string;
    getDate(): string;
}

class ConcreteSnapShot implements Snapshot {
    private readonly text: string;

    constructor(text) {
        this.text = text;
    }

    getText(): string {
        return this.text;
    }

    getDate(): string {
        return `${new Date()}`;
    }
}

class HistoryManager {
    private snapshots: Snapshot[] = [];
    private editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor;
    }

    public backup(): void {
        this.snapshots.push(this.editor.save());
    }

    public undo(): void {
        if (!this.snapshots.length) {
            console.log('no previous data');
            return;
        }

        const latestSnapshot = this.snapshots.pop();
        this.editor.restore(latestSnapshot);
    }
}

// client
const textEditor = new Editor();
const editorHistoryManager = new HistoryManager(textEditor);

// undo when no snap shots
editorHistoryManager.undo();

editorHistoryManager.backup();
textEditor.setText('first text is typed!');

editorHistoryManager.backup();
textEditor.setText('second text is typed!');

console.log(textEditor.getText());

// undo
editorHistoryManager.undo();
console.log(textEditor.getText());
