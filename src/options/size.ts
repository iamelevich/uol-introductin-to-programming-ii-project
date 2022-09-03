import { ToolOption } from './option';

export class SizeOption extends ToolOption {
    readonly initialValue: number = 1;

    addToList(): void {
        this.addNewOption(`
            <p>Size: <span id="size-range-text">${this.initialValue}</span></p>
            <input id="size-range" type="range"
                value="${this.initialValue}"
                min="1"
                max="100"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
        `);
        this.cb(this.initialValue);
        const rangeTextElement = this.p.select('#size-range-text');
        const rangeElement = this.p.select('#size-range');
        rangeElement.elt.addEventListener('input', (e: InputEvent) => {
            e.preventDefault();
            this.cb(rangeElement.value());
            rangeTextElement.html(rangeElement.value().toString());
        });
    }
}