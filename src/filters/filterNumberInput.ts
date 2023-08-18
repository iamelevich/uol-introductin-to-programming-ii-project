import { Filter } from './filter';

import type { FilterConfig } from './filter';
import type { Modal } from '../utils/modal';
import type { PixelHelper } from '../utils/pixelHelper';
import type P5 from 'p5';

export type FilterWithNumberInputConfig = {
  initialValue: number;
  min: number;
  max: number;
} & FilterConfig;

export abstract class FilterWithNumberInput extends Filter {
  protected filterInput: P5.Element | undefined;

  protected initialValue: number;
  protected min: number;
  protected max: number;

  constructor(
    p: P5,
    pixelHelper: PixelHelper,
    modal: Modal,
    { initialValue, min, max, ...baseConfig }: FilterWithNumberInputConfig
  ) {
    super(p, pixelHelper, modal, baseConfig);
    this.initialValue = initialValue;
    this.min = min;
    this.max = max;
  }

  protected getModalContent(): string | P5.Element {
    const content = this.p.createDiv();

    const filterValueElement = this.p.createSpan(this.initialValue.toString()).addClass('font-bold');
    this.p.createP(`${this.config.text}: `).parent(content).child(filterValueElement);

    this.filterInput = this.p
      .createInput(this.initialValue.toString(), 'range')
      .attribute('min', this.min.toString())
      .attribute('max', this.max.toString())
      .addClass('w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-500')
      .parent(content);

    this.filterInput.elt.addEventListener('input', (e: InputEvent) => {
      e.preventDefault();
      filterValueElement.html(this.filterInput?.value().toString());
    });

    return content;
  }
}
