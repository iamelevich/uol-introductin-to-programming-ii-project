import { Filter } from './filter';

import type { Modal } from '../utils/modal';
import type { PixelHelper } from '../utils/pixelHelper';
import type P5 from 'p5';

export class BlurFilter extends Filter {
  private filterInput: P5.Element | undefined;

  constructor(p: P5, pixelHelper: PixelHelper, modal: Modal) {
    super(p, pixelHelper, modal, {
      name: 'blur-filter',
      text: 'Blur'
    });
  }

  protected getModalContent(): string | P5.Element {
    const content = this.p.createDiv();

    const filterValueElement = this.p.createSpan('4');
    this.p.createP('Blur: ').parent(content).child(filterValueElement);

    this.filterInput = this.p
      .createInput('4', 'range')
      .attribute('min', '1')
      .attribute('max', '10')
      .addClass('w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-500')
      .parent(content);

    this.filterInput.elt.addEventListener('input', (e: InputEvent) => {
      e.preventDefault();
      filterValueElement.html(this.filterInput?.value().toString());
    });

    return content;
  }

  apply() {
    this.p.filter(this.p.BLUR, (this.filterInput?.value() as number) || 4);
  }
}
