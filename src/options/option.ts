import type P5 from 'p5';

export abstract class ToolOption {
    readonly optionsSelector = '.options';

    optionsElement: P5.Element;

    constructor(protected p: P5, protected cb: (value?: unknown) => void) {
        this.optionsElement = this.p.select(this.optionsSelector);
    }

    protected addNewOption(optionHTML: string): void {
        this.optionsElement.html(
            `
            <div class="rounded-lg bg-slate-200 p-2 mb-2">${optionHTML}</div>
        `,
            true
        );
    }

    abstract addToList(): void;
}
