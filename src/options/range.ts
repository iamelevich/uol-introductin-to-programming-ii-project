import { ToolOption } from './option';

import type P5 from 'p5';

export type RangeOptionConfig = {
  label?: string;
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
};

export class RangeOption extends ToolOption<number> {
  private readonly options: Required<RangeOptionConfig>;

  constructor(
    protected p: P5,
    protected cb: (value: number) => void,
    options: RangeOptionConfig = {}
  ) {
    super(p, cb);
    this.options = {
      label: 'Size',
      initialValue: 1,
      minValue: 1,
      maxValue: 100,
      ...options
    };
  }

  addToList(): void {
    const normalizedLabel = this.normalize(this.options.label);
    const inputID = `${normalizedLabel}-range`;
    const textID = `${inputID}-text`;
    this.addNewOption(`
            <p>${this.options.label}: <span id="${textID}">${this.options.initialValue}</span></p>
            <input id="${inputID}" type="range"
                value="${this.options.initialValue}"
                min="${this.options.minValue}"
                max="${this.options.maxValue}"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
        `);
    this.cb(this.options.initialValue);
    const rangeTextElement = this.p.select(`#${textID}`);
    const rangeElement = this.p.select(`#${inputID}`);
    if (rangeElement && rangeTextElement) {
      rangeElement.elt.addEventListener('input', (e: InputEvent) => {
        e.preventDefault();
        this.cb(rangeElement.value() as number);
        rangeTextElement.html(rangeElement.value().toString());
      });
    }
  }
}
